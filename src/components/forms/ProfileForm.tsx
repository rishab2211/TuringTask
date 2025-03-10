"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { EditUserProfileSchema } from "@/lib/types";
import { Loader2Icon } from "lucide-react";


function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof EditUserProfileSchema>) {
    setIsLoading(true);
    console.log(values);

    // Simulating API Call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Username Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2Icon className="animate-spin w-4 h-4 mr-2" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ProfileForm;
