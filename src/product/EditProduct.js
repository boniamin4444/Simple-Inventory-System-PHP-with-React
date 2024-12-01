import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState({
    product_name: '',
    description: '',
    price: '',
    stock_amount: '',
    status: 'available',
    category: ''
  });
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product data based on ID
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost/myinventory/backend/get_product_for_edit.php?id=${id}`);
        const result = await response.json();
        if (result.success) {
          setProduct(result.product);
        } else {
          setErrorMessage('Failed to fetch product.');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setErrorMessage('An error occurred while fetching the product.');
      }
    };

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost/myinventory/backend/get_categories.php');
        const result = await response.json();
        if (result.success) {
          setCategories(result.categories);
        } else {
          setErrorMessage('Failed to fetch categories.');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setErrorMessage('An error occurred while fetching categories.');
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/myinventory/backend/update_product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, id }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          alert('Product updated successfully!');
          navigate('/'); // Redirect to the homepage or product list page
        } else {
          setErrorMessage(`Failed to update product: ${result.message}`);
        }
      } else {
        setErrorMessage('Failed to update product: Response not ok');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setErrorMessage('An error occurred while updating the product.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Edit Product</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded border">
        <div className="form-group">
          <label htmlFor="product_name">Product Name</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            className="form-control"
            value={product.product_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock_amount">Stock Amount</label>
          <input
            type="number"
            id="stock_amount"
            name="stock_amount"
            className="form-control"
            value={product.stock_amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={product.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
