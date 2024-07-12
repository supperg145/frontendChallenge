import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/productPage.module.css";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      const product = products.find((p) => p.id === parseInt(id));

      if (product) {
        setProduct(product);
        setLoading(false);
        return;
      }
    }

    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);

        return axios.get("https://fakestoreapi.com/products");
      })
      .then((res) => {
        const products = res.data;
        localStorage.setItem("products", JSON.stringify(products));
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>{product.title}</h1>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>${product.price}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.actionButtons}>
        <Link to={`/products`}>Back to Products</Link> |
        <Link to={`/products/edit/${product.id}`}>Edit Product</Link>
      </div>
    </>
  );
};

export default ProductPage;
