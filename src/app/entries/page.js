"use client";
import { useState, useEffect } from "react";
import { columns } from "./data";
import { DataTable } from "./data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FurnitureItem from "@/models/furniture-item";

export default function Entries() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const furnitureItems = await FurnitureItem.fetchLimitedData();

        console.log(furnitureItems);

        setData(furnitureItems);
      } catch (error) {
        console.error("Failed to fetch furniture items:", error);
        return [];
      }
    }
    getData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Entries Management</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
