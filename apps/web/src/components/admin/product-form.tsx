"use client";

import type { Product } from "@/types";
import type { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { productDefaultValues } from "@/lib/constants";
import { UploadButton } from "@/lib/uploadthing";
import { insertProductSchema, updateProductSchema } from "@/lib/validator";
import { cn } from "@designali/ui";
import { Button, buttonVariants } from "@designali/ui/button";
import { Card, CardContent } from "@designali/ui/card";
import { Checkbox } from "@designali/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@designali/ui/form";
import { Input } from "@designali/ui/input";
import { Textarea } from "@designali/ui/textarea";
import { useToast } from "@designali/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import slugify from "slugify";

export default function ProductForm({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver:
      type === "Update"
        ? zodResolver(updateProductSchema)
        : zodResolver(insertProductSchema),
    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof insertProductSchema>) {
    if (type === "Create") {
      const res = await createProduct(values);
      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
      } else {
        toast({
          description: res.message,
        });
        router.push(`/admin/products`);
      }
    }
    if (type === "Update") {
      if (!productId) {
        router.push(`/admin/products`);
        return;
      }
      const res = await updateProduct({ ...values, id: productId });
      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
      } else {
        router.push(`/admin/products`);
      }
    }
  }
  const images = form.watch("images");
  const isFeatured = form.watch("isFeatured");
  const banner = form.watch("banner");
  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }: { field: any }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xs text-slate-600 dark:text-slate-400">
                  Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }: { field: any }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xs text-slate-600 dark:text-slate-400">
                  Slug
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter product slug"
                      className="pl-8"
                      {...field}
                    />
                    <Button
                      className="absolute right-1 top-1"
                      type="button"
                      size="sm"
                      onClick={() => {
                        form.setValue(
                          "slug",
                          slugify(form.getValues("name"), { lower: true }),
                        );
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xs text-slate-600 dark:text-slate-400">
                  Category
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }: { field: any }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xs text-slate-600 dark:text-slate-400">
                  Brand
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter product brand" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }: { field: any }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xs text-slate-600 dark:text-slate-400">
                  Price
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }: { field: any }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xs text-slate-600 dark:text-slate-400">
                  Stock
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter product stock"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem className="w-full">
                <FormLabel className="flex justify-center py-1 text-center text-xs text-slate-600 dark:text-slate-400">
                  Images
                </FormLabel>
                <Card>
                  <CardContent className="min-h-auto mt-6">
                    <div className="flex-start p-3">
                      <div className="grid gap-3 md:flex">
                        {images.map((image: string) => (
                          <Image
                            key={image}
                            src={image}
                            alt="product image"
                            className="h-full w-auto rounded-sm border border-ali object-cover object-center"
                            width={200}
                            height={200}
                          />
                        ))}
                      </div>
                      <FormControl>
                        <div className="flex justify-center">
                          <UploadButton
                            appearance={{
                              button:
                                "ut-ready:bg-green-500 px-6 ut-uploading:cursor-not-allowed rounded-full bg-ali bg-none after:bg-blue",
                              container:
                                "w-max justify-center flex-row mt-6 rounded-full border-ali bg-slate-200 dark:bg-slate-800",
                              allowedContent:
                                "flex h-10 flex-col items-center justify-center px-4",
                            }}
                            endpoint="imageUploader"
                            onClientUploadComplete={(res: any) => {
                              form.setValue("images", [...images, res[0].url]);
                            }}
                            onUploadError={(error: Error) => {
                              toast({
                                variant: "destructive",
                                description: `ERROR! ${error.message}`,
                              });
                            }}
                          />
                        </div>
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <p className="py-3 text-center text-xs text-slate-600 dark:text-slate-400">
            Featured Product
          </p>
          <Card>
            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="mt-6 flex items-center justify-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Is Featured?</FormLabel>
                  </FormItem>
                )}
              />
              {isFeatured && banner && (
                <Image
                  src={banner}
                  alt="banner image"
                  className="w-full rounded-sm object-cover object-center"
                  width={1920}
                  height={680}
                />
              )}
              {isFeatured && !banner && (
                <div className="flex justify-center">
                  <UploadButton
                    appearance={{
                      button:
                        "ut-ready:bg-green-500 px-6 ut-uploading:cursor-not-allowed rounded-full bg-ali bg-none after:bg-blue",
                      container:
                        "w-max justify-center flex-row mt-6 rounded-full border-ali bg-slate-200 dark:bg-slate-800",
                      allowedContent:
                        "flex h-10 flex-col items-center justify-center px-4",
                    }}
                    endpoint="imageUploader"
                    onClientUploadComplete={(res: any) => {
                      form.setValue("images", [...images, res[0].url]);
                    }}
                    onUploadError={(error: Error) => {
                      toast({
                        variant: "destructive",
                        description: `ERROR! ${error.message}`,
                      });
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xs text-slate-600 dark:text-slate-400">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    className="mt-2 h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Product `}
          </Button>
        </div>
      </form>
    </Form>
  );
}
