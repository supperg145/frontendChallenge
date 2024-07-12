import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "../styles/editProductPage.module.css";

const EditProductPage = ({ handleEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      const foundProduct = products.find((p) => p.id === parseInt(id));

      if (foundProduct) {
        setProduct(foundProduct);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleEdit(product)
      .then(() => {
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
          const products = JSON.parse(storedProducts);
          const updatedProducts = products.map((p) =>
            p.id === product.id ? product : p
          );
          localStorage.setItem("products", JSON.stringify(updatedProducts));
        }

        navigate("/products");
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className={style.editProductPage}>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit} className={style.editProductForm}>
        <h3>Name</h3>
        <input
          name="title"
          type="text"
          value={product.title}
          onChange={handleChange}
          required={true}
        />
        <h3>Description</h3>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required={true}
        />
        <h3>Price</h3>
        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          required={true}
        />
        <br />
        <button type="submit">Edit Product</button>
        <Link to="/products">Back to Products</Link>
      </form>
    </div>
  );
};

export default EditProductPage;
