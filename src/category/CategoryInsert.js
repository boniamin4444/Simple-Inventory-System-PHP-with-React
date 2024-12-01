// src/pages/CategoryInsert.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Updated import

const CategoryInsert = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [count, setCount] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Updated

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);

    const response = await fetch('http://localhost/myinventory/backend/insert_category.php', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        setCount(result.count);
        setMessage('Category added successfully!');
        setName('');  // Clear the name input
        setDescription('');  // Clear the description textarea

        // Refresh the page or navigate after 2 seconds
        setTimeout(() => {
          navigate('/insert_category');  // Redirect to the category list page
          // window.location.reload(); // Use this line if you prefer to reload the page
        }, 2000);
      } else {
        setMessage(result.message);
      }
    } else {
      setMessage('Failed to add category.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Insert New Category</h1>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded border">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Category</button>
          </form>
          {message && <div className="alert alert-info mt-3">{message}</div>}
          {count !== null && <div className="alert alert-success mt-3">Total number of categories: {count}</div>}
        </div>
      </div>
    </div>
  );
};

export default CategoryInsert;
