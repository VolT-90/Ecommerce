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
import { useParams } from "next/navigation";
import {checkoutSchema,checkoutSchemaType} from '@/app/Schema/checkout.schema'
import onlinePayment from "@/checkoutActions/onlineCheckout.action";
import { checkoutType } from "@/types/Checkout.type";



export default function Checkout() {
  const {id} : {id:string} = useParams()
  console.log(id);
  
  
  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      city: "",
      phone: ""
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function handleCheckout(values : checkoutSchemaType) {
  console.log(values);
  
    
  const response : checkoutType = await onlinePayment( id ,'http://localhost:3000/',values)
  if(response.status == "success"){
    window.location.href = response.session.url
  }
  }
  return (
    <div className="w-1/2 mx-auto my-12">
      <h1 className="text-4xl font-bold text-center my-6 text-green-500">
        Checkout Now <i className="fa-solid fa-credit-card"></i>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCheckout)}>

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem className="py-2">
                <FormLabel>Details :</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
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

        <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="py-2">
                <FormLabel>City :</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full bg-green-700 hover:bg-green-500 cursor-pointer my-5 p-5">
            Pay
          </Button>
        </form>
      </Form>
    </div>
  );
}

