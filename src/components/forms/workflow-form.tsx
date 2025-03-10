import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WorkflowSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

type Props = {
  title?: string;
  description?: string;
};

const WorkflowForm = ({ title, description }: Props) => {
  const form = useForm<z.infer<typeof WorkflowSchema>>({
    mode: "onChange",
    resolver: zodResolver(WorkflowSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const isLoading = form.formState.isLoading;
  const router = useRouter();

  function onSubmit(values: z.infer<typeof WorkflowSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="border-none h-full">
      {title && description && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      )}
      <CardContent className="w-full text-lg h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Description" />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default WorkflowForm;
