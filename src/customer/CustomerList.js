import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of customers from the server
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost/myinventory/backend/get_customers.php');
        const result = await response.json();
        if (result.success) {
          setCustomers(result.data);
        } else {
          alert('Failed to fetch customers: ' + result.message);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        alert('Error fetching customers');
      }
    };

    fetchCustomers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-customer/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        const response = await fetch('http://localhost/myinventory/backend/delete_customer.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        const result = await response.json();
        if (result.success) {
          alert('Customer deleted successfully');
          setCustomers(customers.filter(customer => customer.id !== id));
        } else {
          alert('Failed to delete customer: ' + result.message);
        }
      } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Failed to delete customer');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Customer List</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Number of Orders</th>
            <th>Total Amount</th>
            <th>Order Details</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id} style={styles.row}>
              <td>{customer.full_name}</td>
              <td>{customer.number_of_orders}</td>
              <td>{customer.total_amount}</td>
              <td>{customer.order_details}</td>
              <td>{customer.mobile}</td>
              <td>
                <button onClick={() => handleEdit(customer.id)} style={styles.button}>Edit</button>
                <button onClick={() => handleDelete(customer.id)} style={styles.button}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '1px solid #ddd', // Adding border to container
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Adding subtle shadow
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ddd', // Border around the table
  },
  row: {
    borderBottom: '1px solid #ddd', // Border between rows
  },
  button: {
    margin: '0 5px',
    padding: '5px 10px',
    borderRadius: '4px',
    border: '1px solid #007BFF', // Border around the button
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s, border-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
    borderColor: '#004085',
  }
};

export default CustomerList;
