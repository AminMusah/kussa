import { useState } from "react";
import axios from "axios";

const useAllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // get all products
  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/product/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data);
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, getProducts };
};

export default useAllProducts;
