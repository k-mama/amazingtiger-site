"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addToCart as addToCartStorage,
  CART_EVENT,
  clearCart as clearCartStorage,
  clearDiscountCode as clearDiscountCodeStorage,
  getCart,
  getDiscountCode,
  removeFromCart as removeFromCartStorage,
  requestCartOpen,
  setDiscountCode as setDiscountCodeStorage,
  setQuantity as setQuantityStorage,
  type CartItem,
} from "@/lib/shop/cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCodeState] = useState<string | null>(null);

  useEffect(() => {
    setItems(getCart());
    setDiscountCodeState(getDiscountCode());

    function sync() {
      setItems(getCart());
      setDiscountCodeState(getDiscountCode());
    }

    window.addEventListener(CART_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const addToCart = useCallback((slug: string, quantity = 1) => {
    addToCartStorage(slug, quantity);
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setQuantityStorage(slug, quantity);
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    removeFromCartStorage(slug);
  }, []);

  const clearCart = useCallback(() => {
    clearCartStorage();
  }, []);

  const openCart = useCallback(() => {
    requestCartOpen();
  }, []);

  const applyDiscountCode = useCallback((code: string) => {
    setDiscountCodeStorage(code);
  }, []);

  const clearDiscountCode = useCallback(() => {
    clearDiscountCodeStorage();
  }, []);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    count,
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
    openCart,
    discountCode,
    applyDiscountCode,
    clearDiscountCode,
  };
}
