"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { ProductCard } from "./product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductListView({
  title,
  textFilter,
  priceFilter,
  materialsFilter,
  categoryFilter,
}) {
  const [ids, setIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchIds() {
      setIsLoading(true);

      let query = supabase.from("products").select("id");

      const filter = `name.imatch.${textFilter},description.imatch.${textFilter}`;
      if (textFilter) {
        query = query.or(filter);
      }

      try {
        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setIds(data);
      } catch (error) {
        console.error("Error fetching product ids:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchIds();
  }, [textFilter, priceFilter, materialsFilter, categoryFilter]);

  return (
    <div class="my-10 space-y-5">
      {title && (
        <h1 class="ml-20 font-e-ukraine text-3xl font-bold">{title}</h1>
      )}
      <div class="flex w-full justify-center">
        <div class="w-[70%] tablet:w-[90%]">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                ids.map((id) => (
                  <CarouselItem key={id} class="my-1 ml-5">
                    <div className="">
                      <ProductCard id={id.id} />
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
