"use client";
import React, { useState, useEffect } from "react";
import FurnitureItem from "@/models/furniture-item";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag, TagInput } from "emblor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import ImagesArrayUpload from "@/frontend/components/images_array_upload";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB limit
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/gif"];
const base64Regex = /^data:image\/[a-zA-Z]*;base64,[^\s]+$/;

const fileSchema = z
  .instanceof(File)
  .refine((file) => SUPPORTED_FORMATS.includes(file.type), {
    message: "Unsupported file format. Only JPG, PNG, and GIF are allowed.",
  })
  .refine((file) => file.size <= MAX_IMAGE_SIZE, {
    message: `File size should be less than ${MAX_IMAGE_SIZE / 1024 / 1024}MB.`,
  });

const formSchema = z.object({
  name: z
    .string()
    .max(50, { message: "Name must not exceed 50 characters" })
    .nonempty({ message: "Name is required" }),
  description: z
    .string()
    .max(2000, { message: "Description must not exceed 2000 characters" })
    .nonempty({ message: "Description is required" }),
  colors: z
    .array(
      z.object({
        id: z.string().nonempty({ message: "Color ID is required" }),
        text: z.string().nonempty({ message: "Color text is required" }),
      }),
    )
    .nonempty({ message: "At least one color is required" }),
  variants: z
    .array(
      z.object({
        id: z.string().nonempty({ message: "Variant ID is required" }),
        text: z.string().nonempty({ message: "Variant text is required" }),
      }),
    )
    .nonempty({ message: "At least one variant is required" }),
  materials: z
    .array(
      z.object({
        id: z.string().nonempty({ message: "Material ID is required" }),
        text: z.string().nonempty({ message: "Material text is required" }),
      }),
    )
    .nonempty({ message: "At least one material is required" }),
    images: z.array(z.string().regex(base64Regex, "Invalid base64 image format")),
  category: z.string().nonempty({ message: "Category is required" }),
  height: z.string(),

width: z.string().nonempty({ message: "Width is required" }),

depth: z.string().nonempty({ message: "Depth is required" }),
price: z.string().nonempty({ message: "Price is required" }),
stock: z.string().nonempty({ message: "Stock is required" }),
weight: z.string().nonempty({ message: "Weight is required" }),
});

export default function CreateEntry() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
      materials: [],
      materials: [],
      colors: [],
      variants: [],
      price: "",
      weight: "",
      height: "",
      depth: "",
      width: "",
      stock: "",
    },
  });

  const default_filters = {
    category: ["Chair", "Tablr"],
  };

  const [variantTags, setVariantTags] = React.useState([]);
  const [materialTags, setMaterialTags] = React.useState([]);
  const [colorTags, setColorTags] = React.useState([]);
  const [availableMaterials, setAvailableMaterials] = React.useState([]);
  const [availableColors, setAvailableColors] = React.useState([]);
  const [availableFilters, setAvailableFilters] = useState(default_filters);

  const { setValue } = form;

  function onSubmit(values) {
    console.log(values);
    FurnitureItem.createEntry(values)
  }

  useEffect(() => {
    async function fetchData() {
      // Execute both fetch operations in parallel
      const [materialItems, colorItems] = await Promise.all([
        FurnitureItem.getUniqueRows("available_materials"),
        FurnitureItem.getUniqueRows("available_colors"),
      ]);

      // Process the material items into the expected format for autocomplete
      const materialOptions = materialItems.map((item, index) => ({
        id: `material-${index}`, // Ensuring unique ids by prefixing with 'material-'
        text: item.material,
      }));

      // Process the color items into the expected format for autocomplete
      const colorOptions = colorItems.map((item, index) => ({
        id: `color-${index}`, // Ensuring unique ids by prefixing with 'color-'
        text: item.color, // Assuming these items have a 'color' field
      }));

      // Update state for both materials and colors
      setAvailableMaterials(materialOptions);
      setAvailableColors(colorOptions);
    }

    fetchData();
  }, []); // Dependency array is empty, effect runs only on mount

  useEffect(() => {
    async function fetchData() {
      const fetchedItem =
        await FurnitureItem.getUniqueRows("distinct_category");

      const categoryValues = fetchedItem.map((item) => item.category);

      setAvailableFilters((prevFilters) => ({
        ...prevFilters,
        category: categoryValues,
      }));
    }

    fetchData();
  });

  return (
    <Card class="border-1 m-20 rounded-xl border border-zinc-200 bg-white">
      <CardHeader>
        <CardTitle>Create new item</CardTitle>
        <CardDescription>
          Enter the details of new furniture item
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div class="flex space-x-5">
              <div class="w-full space-y-3">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        <ImagesArrayUpload {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descritpion</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter stock amount" type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product weight" type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="colors"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Colors</FormLabel>
                      <FormControl>
                        <TagInput
                          {...field}
                          placeholder="Enter a color"
                          tags={colorTags}
                          className="sm:min-w-[450px]"
                          enableAutocomplete={true}
                          autocompleteOptions={availableColors}
                          setTags={(newTags) => {
                            setColorTags(newTags); // And use setColorTags here
                            setValue("colors", newTags);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div class="w-full space-y-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {availableFilters.category.map((filter) => {
                              return (
                                <SelectItem key={filter} value={filter}>
                                  {filter}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div class='flex justify-between'>
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter height" type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter width" type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="depth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Depth</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter depth" type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product price" type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="variants"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Variants</FormLabel>
                      <FormControl>
                        <TagInput
                          {...field}
                          placeholder="Enter a topic"
                          tags={variantTags}
                          className="sm:min-w-[450px]"
                          setTags={(newTags) => {
                            setVariantTags(newTags); // Use setTopicTags here
                            setValue("variants", newTags);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="materials"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Materials</FormLabel>
                      <FormControl>
                        <TagInput
                          {...field}
                          placeholder="Enter a material"
                          tags={materialTags}
                          className="sm:min-w-[450px]"
                          enableAutocomplete={true}
                          autocompleteOptions={availableMaterials}
                          setTags={(newTags) => {
                            setMaterialTags(newTags); // Use setTopicTags here
                            setValue("materials", newTags);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
