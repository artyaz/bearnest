"use client";

import React, { useEffect, useState } from "react";
import FurnitureItem from "@/models/furniture-item";
import Image from "next/image";
import { BButton } from "./bearnest-button";

export function ProductCard({ id }) {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  //cutting description if > 50 characters
  const truncatedDescription =
    item.description.length > 50
      ? item.description.substring(0, 50) + "..."
      : item.description;

  return (
    <div class=" w-60 space-y-5 rounded-2xl bg-white p-5 outline-neutral-200 hover:outline hover:outline-1">
      <div class="space-y-4">
        <Image
          src={item.images[0]}
          alt="Bearnest Logo"
          width={120}
          height={80}
          class="mx-auto h-36 w-52 rounded-xl object-cover"
        />
        <div class="space-y-1">
          <h1 class="font-e-ukraine text-sm font-bold">{item.title}</h1>
          <p class="font-e-ukraine text-xs font-normal text-neutral-500">
            {truncatedDescription}
          </p>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <h1 class="font-e-ukraine text-sm font-bold">${item.price}</h1>
        <BButton type="rounded" icon="arrow_outward" additionalStyles="min-w-[40px] p-2" />
      </div>
    </div>
  );
}
