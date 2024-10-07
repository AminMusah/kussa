import { useState } from "react";
import axios from "axios";

const useAllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [accummilatedFilters, setAccumilatedFilters] = useState({});

  // get all products
  const getProducts = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams(
        Object.entries(accummilatedFilters)
      );

      const response = await axios.get(`/api/product?${queryParams}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data);
    } catch (error: any) {
      console.error(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // filter shu
  const filterName = (value: any) => {
    const data = {
      name: value,
    };
    setAccumilatedFilters((prevFilters: Record<string, any>) => ({
      ...prevFilters,
      ...data,
    }));
  };

  return { products, loading, getProducts, filterName, accummilatedFilters };
};

export default useAllProducts;
