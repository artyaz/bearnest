'use client';
import { columns } from "./data";
import { DataTable } from "./data-table";
import { Card, CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, } from "@/components/ui/card";
import FurnitureItem from "@/models/furniture-item";

async function getData() {
    try {
      const furnitureItems = await FurnitureItem.fetchLimitedData();
  
      console.log(furnitureItems);
  
      return furnitureItems;
    } catch (error) {

      console.error("Failed to fetch furniture items:", error);
      return []; 
    }
  }

export default async function Entries() {
  const data = await getData();

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
