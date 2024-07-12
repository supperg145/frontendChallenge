// hooks/useProducts.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
      setLoading(false);
    } else {
      axios
        .get("https://fakestoreapi.com/products")
        .then((res) => {
          setProducts(res.data);
          localStorage.setItem("products", JSON.stringify(res.data));
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, []);

  const handleAddProduct = (newProduct) => {
    return axios
      .post("https://fakestoreapi.com/products", newProduct)
      .then((res) => {
        const updatedProducts = [...products, res.data];
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    return axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        console.log("Deleted product:", res.data);
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
      });
  };

  const handleEdit = (updatedProduct) => {
    return axios
      .put(`https://fakestoreapi.com/products/${updatedProduct.id}`, updatedProduct)
      .then((res) => {
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
          const products = JSON.parse(storedProducts);
          const updatedProducts = products.map((p) =>
            p.id === updatedProduct.id ? res.data : p
          );
          localStorage.setItem("products", JSON.stringify(updatedProducts));
          setProducts(updatedProducts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { products, loading, error, handleAddProduct, handleDelete, handleEdit };
};

export default useProducts;
