"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { ProductCard } from "./product-card";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import BearnestPagination from "./bpagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FurnitureItem from "@/models/furniture-item";
import SearchFilters from "./search-filters";
import { Input } from "@/components/ui/input";

// Constants
const ITEMS_PER_PAGE = 5;

export function ProductFlexView({ title, textFilter, categoryFilter, gtFilter, ltFilter, wFilter }) {
  const default_filters = {
    category: ["Chair", "Tablr"],
  };
  const [ids, setIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableFilters, setAvailableFilters] = useState(default_filters);
  const [filter, setFilter] = useState("");

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  function handleFilterChange(key, value) {
    if (value == "") value = undefined;
    setFilter((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
    console.log("filter:");
    console.log(filter);
  }

  const totalPages = Math.ceil(ids.length / ITEMS_PER_PAGE);

  useEffect(() => {
    async function fetchIds() {
      setIsLoading(true);
      let query = supabase.from("products").select("id");

      const filterConfig = {
        category: { column: "category", operator: "eq" },
        minPrice: { column: "price", operator: "gte" },
        maxPrice: { column: "price", operator: "lte" },
        maxWeight: { column: "weight", operator: "lte" },
      };

      Object.keys(filter).forEach((key) => {
        if (filter[key] !== undefined && filterConfig[key]) {
          const { column, operator } = filterConfig[key];
          query = query.filter(column, operator, filter[key]);
        }
      });

      const textQuery = `name.imatch.${textFilter},description.imatch.${textFilter}`;
      const categoryQuery = `category.eq.${categoryFilter}`;
      console.log('category filter:');
      console.log(categoryFilter);
      if (textFilter) {
        query = query.or(textQuery);
      }
      if (categoryFilter) {
        query = query.or(categoryQuery);
      }

      try {
        let { data, error } = await query;
        if (error) throw error;
        setIds(data);
      } catch (error) {
        console.error("Error fetching product ids: ", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchIds();
  }, [filter]);

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

  const rangeStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedIds = ids.slice(rangeStart, rangeStart + ITEMS_PER_PAGE);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <>
      <SearchFilters
        filter_data={availableFilters}
        onFilterChange={handleFilterChange}
      />
      {title ? (<h1 class='font-e-ukraine text-2xl ml-10'>{title}</h1>) : (<></>)}
      <div className="grid grid-cols-5 grid-rows-none gap-y-6 p-10">
  {isLoading ? (
    <p>Loading...</p>
  ) : (
    paginatedIds.length > 0 ? (
      paginatedIds.map((id) => <ProductCard key={id.id} id={id.id} />)
    ) : (
      <h1>There are currently no products with selected filters :(</h1>
    )
  )}
</div>
      <div class="mb-10 flex justify-center">
        <BearnestPagination
          pages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
