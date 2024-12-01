import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost/myinventory/backend/get_categories.php');
      const result = await response.json();
      setCategories(result.categories);
    };

    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    // Confirm the deletion
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`http://localhost/myinventory/backend/delete_category.php?id=${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          // Update the categories state to remove the deleted category
          setCategories(categories.filter(category => category.id !== id));
        } else {
          console.error('Failed to delete the category.');
          alert('Failed to delete the category.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the category.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Category List</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <Link to={`/edit_category/${category.id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
                <button 
                  onClick={() => deleteCategory(category.id)} 
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
