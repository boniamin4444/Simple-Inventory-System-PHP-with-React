import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    price: '',
    stock_amount: '',
    status: 'available', // Default status
    category: '' // Added category field
  });

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]); // State to hold categories
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost/myinventory/backend/get_categories.php');
        if (response.data && response.data.categories) {
          setCategories(response.data.categories);
        } else {
          console.error('No categories found.');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('product_name', formData.product_name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock_amount', formData.stock_amount);
    data.append('status', formData.status);
    data.append('category', formData.category); // Append category

    if (image) {
      data.append('image', image);
    }

    axios.post('http://localhost/myinventory/backend/create_product.php', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      if (response.data.success) {
        navigate('/');
      } else {
        setErrorMessage('Failed to add product: ' + response.data.error);
      }
    }).catch(error => {
      console.log('There was an error creating the product:', error);
      setErrorMessage('Failed to add product.');
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add New Product</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="product_name"
            className="form-control"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock Amount:</label>
          <input
            type="number"
            name="stock_amount"
            className="form-control"
            value={formData.stock_amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
