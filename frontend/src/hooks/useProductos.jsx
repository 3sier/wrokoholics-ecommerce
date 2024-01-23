import { useState } from "react";
import { fetchProductos } from "../service/productos";
import { useCallback } from "react";

export const useProductos = () => {
  const [productos, setProductos] = useState([]);

  const getProductos = useCallback(async () => {
    try {
      let url = "http://localhost:3003/api/productos";
      const product = await fetchProductos(url);
      setProductos(product);
    } catch (e) {
      console.error("Error fetching productos:", e);
    }
  }, []);

  return { productos, getProductos };
};
