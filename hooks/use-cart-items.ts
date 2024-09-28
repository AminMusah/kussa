import { useState } from "react";
import axios from "axios";

const useGetCart = () => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/cart`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCart(response.data);
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return { cart, getCart, loading };
};

export default useGetCart;
