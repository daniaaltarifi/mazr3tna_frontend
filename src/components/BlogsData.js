// BlogsData.js
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const BlogsData = () => {
  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    const fetchblogs = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios(`${API_URL}/blogs/get/blogs`);
        setblogs(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    
    fetchblogs();
  }, []);

  return { blogs };
};

export default BlogsData;
