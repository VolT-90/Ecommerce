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
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema, loginSchemaType } from "../Schema/login.schema";
import {signIn} from "next-auth/react"



export default function Login() {
  
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: loginSchemaType) {
    console.log(values);
    //call api
    // try {
    //   let res = await axios.post(
    //     "https://ecommerce.routemisr.com/api/v1/auth/signin",
    //     values
    //   );
    //   console.log(res);
    //   if (res.data.message === "success") {
    //     //Alert & go login
    //   toast.success("Welcome back ✅", {
    //     position: "top-center",
    //     duration: 2000,
    //     className: "!bg-green-500 !border !border-green-500 !text-white !font-semibold !rounded-xl !shadow-md",
    //   })
    //   navigate.push('/')
    // }
    // } catch (error : any){
    //   toast.error(`${error.response.data.message} ❌`,{
    //     position: "top-center",
    //     duration: 2000,
    //     className: "!bg-red-500 !text-white !border !border-red-500 !font-semibold !rounded-xl !shadow-md",})
    // }
    const response = await signIn("credentials",{
      email : values.email,
      password : values.password,
      redirect : false,
      callbackUrl : '/'
    })

    console.log(response)

    if(response?.ok){
      toast.success("Welcome back ✅", {
        position: "top-center",
        duration: 2000,
        className: "!bg-green-500 !border !border-green-500 !text-white !font-semibold !rounded-xl !shadow-md",
      })
      window.location.href = '/'
    }
    else{
        toast.error(`${response?.error} ❌`,{
        position: "top-center",
        duration: 2000,
        className: "!bg-red-500 !text-white !border !border-red-500 !font-semibold !rounded-xl !shadow-md",})
    }
  }

  return (
    <div className="w-1/2 mx-auto my-12">
      <h1 className="text-4xl font-bold text-center my-6 text-green-500">
        Login Now <i className="fa-regular fa-user"></i>{" "}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>

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

          <Button className="w-full bg-green-500 cursor-pointer my-5 p-5">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
