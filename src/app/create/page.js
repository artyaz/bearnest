"use client";
import React, { useState, useEffect } from 'react';
import FurnitureItem from "@/models/furniture-item";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag, TagInput } from 'emblor';

const formSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(2000),
  topicTags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
});



export default function CreateEntry() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      images: "",
      dimension_w: "",
      dimension_h: "",
      dimension_d: "",
      materials: "",
      colors: "",
      variants: "",
      category: "",
    },
  });

  const [topicTags, setTopicTags] = React.useState([]);
  const [colorTags, setColorTags] = React.useState([]);
  const [availableMaterials, setAvailableMaterials] = React.useState([]);
  const [availableColors, setAvailableColors] = React.useState([]);

  const { setValue } = form;

  function onSubmit(values) {
    console.log(values);
  }

  useEffect(() => {
    async function fetchData() {
      // Execute both fetch operations in parallel
      const [materialItems, colorItems] = await Promise.all([
        FurnitureItem.getUniqueRows("available_materials"),
        FurnitureItem.getUniqueRows("available_colors")
      ]);
  
      // Process the material items into the expected format for autocomplete
      const materialOptions = materialItems.map((item, index) => ({
          id: `material-${index}`,  // Ensuring unique ids by prefixing with 'material-'
          text: item.material
      }));
  
      // Process the color items into the expected format for autocomplete
      const colorOptions = colorItems.map((item, index) => ({
          id: `color-${index}`,  // Ensuring unique ids by prefixing with 'color-'
          text: item.color  // Assuming these items have a 'color' field
      }));
      console.log('materials:');
      console.log(materialOptions);
      console.log('colors:');
      console.log(colorOptions);
  
      // Update state for both materials and colors
      setAvailableMaterials(materialOptions);
      setAvailableColors(colorOptions);
      
    }
  
    fetchData();
    
  }, []); // Dependency array is empty, effect runs only on mount
  
  

  return (
    <Card class='border-1 m-20 rounded-xl border border-zinc-200 bg-white'>
      <CardHeader>
        <CardTitle>Create new item</CardTitle>
        <CardDescription>Enter the details of new furniture item</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=""
          >
            <div class='flex space-x-5'>
            <div class='w-full'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div class='w-full'>
            <FormField
  control={form.control}
  name="topics"
  render={({ field }) => (
    <FormItem className="flex flex-col items-start">
      <FormLabel className="text-left">Topics</FormLabel>
      <FormControl>
        <TagInput
          {...field}
          placeholder="Enter a topic"
          tags={topicTags}
          className="sm:min-w-[450px]"
          enableAutocomplete={true}
          autocompleteOptions={availableMaterials}
          setTags={(newTags) => {
            setTopicTags(newTags);    // Use setTopicTags here
            setValue('topics', newTags);
          }}
        />
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
            setColorTags(newTags);   // And use setColorTags here
            setValue('colors', newTags);
          }}
        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
