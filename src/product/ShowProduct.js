import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ShowProduct.css';

const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost/myinventory/backend/get_products.php');
        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          setError('No products found.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.product_name}?`)) {
        axios.delete(`http://localhost/myinventory/backend/delete_product.php?id=${product.id}`)
            .then(response => {
                if (response.data.success) {
                    // Remove the deleted product from the state without re-fetching
                    const updatedProducts = products.filter(p => p.id !== product.id);
                    setProducts(updatedProducts); // Update the state with the filtered products
                } else {
                    alert('Failed to delete the product: ' + response.data.error);
                }
            })
            .catch(error => {
                console.error('There was an error deleting this item:', error);
            });
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container error">{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="title">Products List</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <div className="products-grid">
        {products.length === 0 ? (
          <div>No products available.</div>
        ) : (
          products.map(product => (
            <div className="product-card" key={product.id}>
              <img
                src={`http://localhost/myinventory/backend/${product.image}`}
                alt={product.product_name}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-name">{product.product_name}</h3>
                <p className="product-category"><strong>Category:</strong> {product.category_name}</p>
                <p className="product-price"><strong>Price:</strong> Tk{product.price}</p>
                <p className="product-stock"><strong>Stock:</strong> {product.stock_amount} pcs</p>
                <p className="product-status"><strong>Status:</strong> {product.status}</p>
                <div className="product-actions">
                  <Link to={`/editproduct/${product.id}`} className="btn btn-primary">Edit</Link>
                  <button onClick={() => handleDelete(product)} className="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShowProduct;
