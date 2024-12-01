import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCustomer = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    full_name: '',
    number_of_orders: '',
    total_amount: '',
    order_details: '',
    mobile: '',
  });
  const navigate = useNavigate(); // Updated

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost/myinventory/backend/get_customer.php?id=${id}`);
        const result = await response.json();
        if (result.success) {
          setFormData(result.data);
        } else {
          alert('Failed to fetch customer details: ' + result.message);
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
        alert('Error fetching customer details');
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/myinventory/backend/update_customer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...formData }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Customer updated successfully');
        navigate('/customer-list'); // Updated
      } else {
        alert('Failed to update customer: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Failed to update customer');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Edit Customer</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Full Name:
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Number Of Orders:
          <input
            type="number"
            name="number_of_orders"
            value={formData.number_of_orders}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Total Amount:
          <input
            type="number"
            name="total_amount"
            step="0.01"
            value={formData.total_amount}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Order Details:
          <textarea
            name="order_details"
            value={formData.order_details}
            onChange={handleChange}
            rows="4"
            style={styles.textarea}
          />
        </label>
        <label style={styles.label}>
          Mobile:
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>
          Update Customer
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
  },
};

export default EditCustomer;
