import { Link } from 'react-router-dom';
import styles from '../styles/homePage.module.css';

const HomePage = ({ products, loading, error, handleDelete }) => {
    return (
        <div>
            <h1>Products</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <form>
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>
                                    <div className={styles.actionButtons}>
                                        <Link to={`/products/show/${product.id}`}>Show</Link> |
                                        <Link to={`/products/edit/${product.id}`}>Edit</Link> |
                                        <button
                                            type="button"
                                            className={styles.productTableButton}
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
            <Link to={`/products/new`} className={styles.addProductLink}>Add Product</Link>
        </div>
    );
};

export default HomePage;
