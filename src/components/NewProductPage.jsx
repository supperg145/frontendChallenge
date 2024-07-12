import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/newProductPage.module.css';

const NewProductPage = ({ handleAddProduct }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { title, description, price: price };
        if(!title || !description || !price) {
            alert('Please fill in all fields');
            return;
        }
        handleAddProduct(newProduct);
        navigate('/products');
    };

    return (
        <div className={styles.newProductPage}>
            <h1>Add a new Product</h1>
            <form onSubmit={handleSubmit} className={styles.newProductForm}>
                <h3>Name</h3>
                <input name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <h3>Description</h3>
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <h3>Price</h3>
                <input name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                <br />
                <div className={styles.actionButtons}>
                <button type="submit">Add Product</button>
                <Link to="/products">Back to Products</Link>
                </div>
            </form>
        </div>
    );
};

export default NewProductPage;
