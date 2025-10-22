"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { registerSchema, registerSchemaType } from "../Schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  const navigate = useRouter();
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(values: registerSchemaType) {
    console.log(values);
    //call api
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log(res);
      if (res.data.message === "success") {
        //Alert & go login
        toast.success("Register done ✅", {
          position: "top-center",
          duration: 2000,
          className:
            "!bg-green-500 !border !border-green-500 !text-white !font-semibold !rounded-xl !shadow-md",
        });
        navigate.push("/login");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(`${error?.response?.data.message} ❌`, {
          position: "top-center",
          duration: 2000,
          className:
            "!bg-red-500 !text-white !border !border-red-500 !font-semibold !rounded-xl !shadow-md",
        });
      }
    }
  }

  return (
    <div className="w-1/2 mx-auto my-12">
      <h1 className="text-4xl font-bold text-center my-6 text-green-500">
        Register Now <i className="fa-solid fa-id-card"></i>{" "}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="py-2">
                <FormLabel>Name :</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="py-2">
                <FormLabel>Email :</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="py-2">
                <FormLabel>Password :</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem className="py-2">
                <FormLabel>re-Password :</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="py-2">
                <FormLabel>Phone :</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full bg-green-500 cursor-pointer my-5 p-5">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
