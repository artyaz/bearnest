import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function SearchFilters({ filter_data, onFilterChange }) {
  return (
    <>
      <div class="flex justify-center space-x-5 p-5">
        <Select
          onValueChange={(newValue) => onFilterChange("category", newValue)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {filter_data.category.map((filter) => {
                return (
                  <SelectItem key={filter} value={filter}>
                    {filter}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          onChange={(e) => onFilterChange("minPrice", e.target.value)}
          placeholder="Greater than"
          type="number"
          icon="attach_money"
          input_w="140"
        />
        <Input
          onChange={(e) => onFilterChange("maxPrice", e.target.value)}
          placeholder="Less than"
          type="number"
          icon="attach_money"
        />
        <Input
          onChange={(e) => onFilterChange("maxWeight", e.target.value)}
          placeholder="Max weight"
          type="number"
          icon="inventory_2"
        />
      </div>
    </>
  );
}
