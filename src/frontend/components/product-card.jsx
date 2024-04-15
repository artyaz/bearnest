"use client";

import React, { useEffect, useState } from "react";
import FurnitureItem from "@/models/furniture-item";
import Image from "next/image";
import { BButton } from "./bearnest-button";

export function ProductCard({ id }) {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading || !item) {
    return <div>Loading...</div>;
  }

  //cutting description if > 50 characters
  const truncatedDescription =
    item.description.length > 50
      ? item.description.substring(0, 50) + "..."
      : item.description;

  return (
    <div class="w-48 space-y-2 rounded-2xl border border-stone-900 p-3">
      <Image
        src={item.images[0]}
        alt="Bearnest Logo"
        width={120}
        height={80}
        class="mx-auto"
      />
      <h1 class="font-e-ukraine text-sm font-bold">{item.title}</h1>
      <p class="font-e-ukraine text-xs font-normal">{truncatedDescription}</p>
      <div class="flex items-center justify-between">
        <h1 class="font-e-ukraine text-sm font-bold">{item.price}</h1>
        <BButton variant="black" type="rounded" icon="arrow_outward" />
      </div>
    </div>
  );
}
