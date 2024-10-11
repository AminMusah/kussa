import { useState } from "react";
import axios from "axios";

const useAllCategories = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // get all categories
  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/categories`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCategories(response.data);
    } catch (error: any) {
      console.error(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, getCategories };
};

export default useAllCategories;
