import  { DefaultSession } from "next-auth";

declare module "next-auth" {
  // Shape of the user returned from authorize()
  interface User {
    user: {
      name: string;
      email: string;
      role: string;
    };
    token: string;
  }

  // Shape of the session returned to the client
  interface Session extends DefaultSession {
    user: {
      name: string;
      email: string;
      role: string;
    };
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      name: string;
      email: string;
      role: string;
    };
    accessToken?: string;
  }
}
