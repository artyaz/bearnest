"use client";

import React, { useEffect, useState } from "react";
import FurnitureItem from "@/models/furniture-item";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BButton } from "@/frontend/components/bearnest-button";
import { AmountInput } from "@/frontend/components/amount-input";
import { Separator } from "@/components/ui/separator"


export default function Product({ params }) {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const id = params.id;
  //console.log(item.dimensions.width);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const fetchedItem = await FurnitureItem.getItemById(id);
      fetchedItem.images = FurnitureItem.generateImageLinks(
        fetchedItem.image_count,
        id,
      );
      setItem(fetchedItem);
      setIsLoading(false);
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div class="mt-5 tablet:flex">
          <div class="w-[85%] tablet:w-[60%]">
            <Carousel
              opts={{
                align: "start",
              }}
              className=" ml-16 tablet:ml-20"
            >
              <CarouselContent>
                {item.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div>
                      <Image
                        src={image}
                        alt={`Item Image ${index + 1}`}
                        height={400}
                        width={600}
                        class="m-1 h-[300px] w-[98%] rounded-xl object-cover outline outline-1 outline-neutral-200 tablet:h-[600px]"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div class="ml-20 space-y-3">
            <h1 class="font-e-ukraine text-xl font-bold">{item.title}</h1>
            <h1 class="font-e-ukraine font-bold">${item.price}</h1>
            <p class="font-e-ukraine text-sm font-normal">Select size</p>
            <p class="font-e-ukraine text-sm font-normal">Select color</p>
            <div class="space-y-2">
              <div class="flex space-x-2">
                <AmountInput />
                <BButton icon="add_shopping_cart" variant="white">
                  Add to cart
                </BButton>
                
                <BButton icon="favorite" variant="white" />
              </div>
              <BButton additionalStyles="w-full">Buy it now</BButton>
            </div>
          </div>
        </div>
      </div>
      <div class='flex p-20 space-x-5'>
        <div class='w-[50%] space-y-2'>
          <h1 className="text-lg font-e-ukraine font-bold">Description</h1>
          <p class='font-e-ukraine text-xs font-light text-gray-600'>{item.description}</p>
        </div>
        <Separator orientation="vertical" />
        <div class='w-[50%] space-y-2'>
          <h1 className="text-lg font-e-ukraine font-bold">Dimensions</h1>
        </div>
      </div>
    </>
  );
}
