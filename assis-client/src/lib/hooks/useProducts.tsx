import { useState, useEffect } from "react";
import api from '@lib/api';
import type { Product } from "@lib/types";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getProds(){
      try {
        const prods = await api.getProducts(signal);
        setProducts(prods)
      } catch (error: any) {
        throw new Error(error)
      }
    }
    getProds()
    return () => controller.abort()
  }, [])
 
 

  return products;
};
