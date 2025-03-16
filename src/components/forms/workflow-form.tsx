"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WorkflowSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


// Separate component for the form to prevent state updates during parent render
const WorkflowForm = ({ onClose }: { onClose: () => void }) => {
  const form = useForm<z.infer<typeof WorkflowSchema>>({
    mode: "onChange",
    resolver: zodResolver(WorkflowSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (values: z.infer<typeof WorkflowSchema>) => {
    console.log(values);
    // form submission logic here
  };

  return (
    <Card className="border-none h-full w-[80vw] lg:w-[50vw]">
      <CardContent className="w-full text-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
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
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Description" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
            <Button
              variant="default"
              className="hover:bg-slate-800 w-full border hover:text-white"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default WorkflowForm;
