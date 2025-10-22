import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // 1️⃣ Validate credentials
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // 2️⃣ Send login request to your backend
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        // 3️⃣ Handle request failure
        if (!response.ok) {
          throw new Error("Failed to connect to authentication API");
        }

        const payload = await response.json();
        console.log("Login Response:", payload);

        // 4️⃣ Check if backend login succeeded
        if (payload.message === "success" && payload.token) {
          const decoded = jwtDecode<{ id: string }>(payload.token);
          console.log("Decoded Token:", decoded);

          // 5️⃣ Return user object for NextAuth
          return {
            id: decoded.id, // must be a string
            user: payload.user, // e.g. { name, email, role }
            token: payload.token, // store JWT for later
          };
        }

        // 6️⃣ Throw error for wrong credentials
        throw new Error(payload.message || "Invalid email or password");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user; // user info
        token.accessToken = user.token; // store JWT
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user!; // typed now
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
