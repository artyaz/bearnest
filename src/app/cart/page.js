'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AmountInput } from '@/frontend/components/amount-input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart from local storage or set it to an empty array if it doesn't exist
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateQuantity = (productId, variant, color, newQuantity) => {
    let updatedCart = cart.slice();

    const productIndex = updatedCart.findIndex(
      (item) => item.id === productId && item.variant === variant && item.color === color,
    );

    if (productIndex !== -1 && newQuantity > 0) {
      updatedCart[productIndex].quantity = newQuantity;
    } else if (newQuantity === 0) {
      updatedCart = updatedCart.filter(
        (item) => !(item.id === productId && item.variant === variant && item.color === color),
      );
    } else {
      console.log("Product not found or invalid quantity.");
      return;
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const deleteProduct = (productId, variant, color) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === productId && item.variant === variant && item.color === color),
    );

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = parseFloat(cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2));

  return (
    <div class='flex space-x-2'>
    <Card className='w-[70%] m-5'>
      <CardHeader>
        <CardTitle>Cart</CardTitle>
        <CardDescription>Review products before proceed to purchase</CardDescription>
      </CardHeader>
      <CardContent>
    <Table >
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Variant</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Remove</TableHead>
          <TableHead>Total price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {cart.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium"><Image width={50} height={50} className="rounded-lg" src={item.image} alt={item.name} /></TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>${item.price}</TableCell>
            <TableCell>{item.color ? item.color : "default"}</TableCell>
            <TableCell>{item.variant ? item.variant : "default"}</TableCell>
            <TableCell><AmountInput value={item.quantity} onChange={(newQuantity) => {updateQuantity(item.id, item.variant, item.color, newQuantity)}} /></TableCell>
            <TableCell><Button variant="destructive" onClick={() => deleteProduct(item.id, item.variant, item.color)}>
                <span className="material-icons-round !text-xs">remove</span>
              </Button></TableCell>
              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </CardContent>
    </Card>
    <Card className='w-[25%] m-5 h-fit'>
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <div class='flex justify-between border-b border-dashed border-zinc-200 p-2'>
          <Label>Total</Label>
          <Label>${total}</Label>
        </div>
        
        <Dialog>
      <DialogTrigger asChild>
      <Button className='w-full mt-5'>Proceed to checkout</Button>
      </DialogTrigger>
      <DialogContent className=" w-fit rounded-xl justify-start">
          <DialogTitle>That's all!  Thanks for taking interest in our project 🤓 </DialogTitle>
          <DialogDescription>
            Feel free to contribute on our github.
          </DialogDescription>
        <DialogFooter>
        <DialogClose asChild>
            <Button type="button" variant="outline" className=''>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </CardContent>
    </Card>
    </div>
  );
}