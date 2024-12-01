import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCategory = () => {
  const { id } = useParams(); // Get category ID from URL
  const [category, setCategory] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch category data based on ID
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost/myinventory/backend/get_category.php?id=${id}`);
        const result = await response.json();
        if (result.success) {
          setCategory(result.category);
        } else {
          alert('Failed to fetch category.');
        }
      } catch (error) {
        console.error('Error fetching category:', error);
        alert('An error occurred while fetching the category.');
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/myinventory/backend/update_category.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...category, id }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          alert('Category updated successfully!');
          navigate('/view_categoryList'); // Redirect to the category list page
        } else {
          alert(`Failed to update category: ${result.message}`);
        }
      } else {
        alert('Failed to update category: Response not ok');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('An error occurred while updating the category.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Edit Category</h1>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded border">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={category.name}
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
            value={category.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Category</button>
      </form>
    </div>
  );
};

export default EditCategory;
