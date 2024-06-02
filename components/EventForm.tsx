"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Counter } from "@/components/Counter";
import { CreationBottomBar } from "@/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import FileUploader from "@/components/FileUploader";
import { useFormContext, FormProvider } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { createDescriptionSchema } from "@/app/(root)/create/types";
import { z } from "zod";
import { useUploadThing } from "@/lib/uploadthing";
import { createDescription } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";

type EventFormProps = {
  userId: string;
  hotelId: string;
};

const EventForm = ({ userId, hotelId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof createDescriptionSchema>>({
    resolver: zodResolver(createDescriptionSchema),
    defaultValues: {
      coverImageUrl: "",
      title: "",
      description: "",
      price: "",
      guest: 1,
      room: 1,
      bathroom: 1,
      specialNote: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createDescriptionSchema>) => {
    let uploadedImageUrl = values.coverImageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) return;
      uploadedImageUrl = uploadedImages[0].url;
    }

    const formData = new FormData();
    formData.append("imageUrl", uploadedImageUrl);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("guest", values.guest.toString());
    formData.append("room", values.room.toString());
    formData.append("bathroom", values.bathroom.toString());
    formData.append("hotelId", hotelId);
    formData.append("userId", userId);
    formData.append("specialNote", values.specialNote);
    console.log(formData);
    try {
      const res = await createDescription(formData);
      console.log("Form submitted successfully:", res);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
            <Label>Cover Image</Label>
            <div className="flex flex-col gap-y-2 border border-rose-200 rounded-xl">
              <FormField
                control={form.control}
                name="coverImageUrl"
                render={({ field }) => (
                  <FormItem className="w-full h-92">
                    <FormControl className="h-92">
                      <FileUploader
                        onFieldChange={field.onChange}
                        imageUrl={field.value}
                        setFiles={setFiles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Short and simple..."
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Please describe your home..."
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Price per Night in USD"
                        value={field.value}
                        min={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Special Note</Label>
              <FormField
                control={form.control}
                name="specialNote"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Any special note for your guests?"
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Card>
              <CardHeader className="flex flex-col gap-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="underline font-medium">Guests</h3>
                    <p className="text-muted-foreground text-sm">
                      How many guests do you want?
                    </p>
                  </div>

                  <Counter control={form.control} name="guest" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="underline font-medium">Rooms</h3>
                    <p className="text-muted-foreground text-sm">
                      How many rooms do you have?
                    </p>
                  </div>

                  <Counter control={form.control} name="room" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="underline font-medium">Bathrooms</h3>
                    <p className="text-muted-foreground text-sm">
                      How many bathrooms do you have?
                    </p>
                  </div>

                  <Counter control={form.control} name="bathroom" />
                </div>
              </CardHeader>
            </Card>
          </div>

          <CreationBottomBar isSubmitting={form.formState.isSubmitting} />
        </form>
      </Form>
    </FormProvider>
  );
};

export default EventForm;
