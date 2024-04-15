"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { ProductCard } from "./product-card";

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

      const filter = `name.imatch.${textFilter}%,description.imatch.${textFilter}`;
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
    <div class="m-5 space-y-3">
      {title && <h1 class="font-e-ukraine text-3xl font-bold">{title}</h1>}
      <div class="flex space-x-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          ids.map((id) => <ProductCard id={id.id} />)
        )}
      </div>
    </div>
  );
}
