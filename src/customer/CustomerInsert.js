import React, { useState } from 'react';

const CustomerInsert = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    number_of_orders: '',
    total_amount: '',
    order_details: '',
    mobile: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status
  const [errors, setErrors] = useState({}); // State to track form validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = 'Full Name is required';
    if (!formData.number_of_orders || formData.number_of_orders < 0) newErrors.number_of_orders = 'Valid Number Of Orders is required';
    if (!formData.total_amount || formData.total_amount < 0) newErrors.total_amount = 'Valid Total Amount is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true); // Set submitting state to true

    try {
      console.log("Submitting data:", formData); // Debugging line

      const response = await fetch('http://localhost/myinventory/backend/insert_customer.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Server response:", result); // Debugging line

      if (result.success) {
        alert('Customer added successfully');
        setFormData({
          full_name: '',
          number_of_orders: '',
          total_amount: '',
          order_details: '',
          mobile: '',
        });
        setErrors({}); // Clear validation errors on success
      } else {
        alert('Failed to add customer: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add customer');
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Full Name:
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            style={{ ...styles.input, borderColor: errors.full_name ? 'red' : '#ccc' }}
          />
          {errors.full_name && <div style={styles.error}>{errors.full_name}</div>}
        </label>
        <label style={styles.label}>
          Number Of Orders:
          <input
            type="number"
            name="number_of_orders"
            value={formData.number_of_orders}
            onChange={handleChange}
            required
            style={{ ...styles.input, borderColor: errors.number_of_orders ? 'red' : '#ccc' }}
          />
          {errors.number_of_orders && <div style={styles.error}>{errors.number_of_orders}</div>}
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
            style={{ ...styles.input, borderColor: errors.total_amount ? 'red' : '#ccc' }}
          />
          {errors.total_amount && <div style={styles.error}>{errors.total_amount}</div>}
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
            style={{ ...styles.input, borderColor: errors.mobile ? 'red' : '#ccc' }}
          />
          {errors.mobile && <div style={styles.error}>{errors.mobile}</div>}
        </label>
        <button
          type="submit"
          style={styles.button}
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? 'Adding...' : 'Add Customer'}
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
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    fontSize: '0.9em',
    marginTop: '5px',
  }
};

export default CustomerInsert;
