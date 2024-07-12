// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import ProductPage from "./components/ProductPage.jsx";
import NewProductPage from "./components/NewProductPage.jsx";
import EditProductPage from "./components/EditProductPage.jsx";
import CreatedPage from "./components/CreatedPage.jsx";
import useProducts from "./hooks/useProducts";

function App() {
  const { products, loading, error, handleAddProduct, handleDelete, handleEdit } = useProducts();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/products"
          element={
            <HomePage
              products={products}
              loading={loading}
              error={error}
              handleDelete={handleDelete}
            />
          }
        />
        <Route path="/products/show/:id" element={<ProductPage />} />
        <Route
          path="/products/new"
          element={<NewProductPage handleAddProduct={handleAddProduct} />}
        />
        <Route
          path="/products/edit/:id"
          element={<EditProductPage handleEdit={handleEdit} />}
        />
        <Route path="/products/create" element={<CreatedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
