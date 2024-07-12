import { Link } from 'react-router-dom';

const CreatedPage = () => {
    return (
        <>
            <h1>Product Created</h1>
            <Link to="/products">Back to Products</Link>
        </>
    )
}

export default CreatedPage