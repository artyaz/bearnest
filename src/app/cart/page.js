'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AmountInput } from '@/frontend/components/amount-input';

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

  return (
    <>
      <div>
        <h1>Cart:</h1>
        {cart.map((item, index) => (
          <div key={index} className="flex bg-white">
            <Image width={50} height={50} className="rounded-lg" src={item.image} alt={item.name} />
            <div>
              <div className="flex justify-between">
                <h1>{item.name}</h1>
                <h1>${item.price}</h1>
              </div>
              <div className="flex justify-between">
                <h1>Color: {item.color ? item.color : "default"}</h1>
                <h1>Variant: {item.variant ? item.variant : "default"}</h1>
              </div>
            </div>
            <div>
              <Button variant="destructive" onClick={() => deleteProduct(item.id, item.variant, item.color)}>
                <span className="material-icons-round !text-xs">remove</span>
              </Button>
              <AmountInput value={item.quantity} onChange={(newQuantity) => {updateQuantity(item.id, item.variant, item.color, newQuantity)}} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}