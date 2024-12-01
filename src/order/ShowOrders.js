import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Main Component
const ShowOrders = () => {
  const [orderList, setOrderList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost/myinventory/backend/order/orders.php');
      if (Array.isArray(data)) {
        setOrderList(data);
      } else {
        console.error('Expected an array but got:', data);
        setOrderList([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const { data } = await axios.get(`http://localhost/myinventory/backend/order/get_order_details.php?order_id=${orderId}`);
      if (data.success) {
        setOrderDetails(data);
        setSelectedOrder(orderId);
        setShowModal(true);
      } else {
        console.error('Failed to fetch order details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const updateStockQuantity = async (items) => {
    try {
      await Promise.all(items.map(item =>
        axios.post('http://localhost/myinventory/backend/product/update_stock.php', {
          product_id: item.product_id,
          quantity: item.stock_amount - item.quantity
        })
      ));
    } catch (error) {
      console.error('Error updating stock quantity:', error);
      alert('Error updating stock quantity');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.post('http://localhost/myinventory/backend/order/update_order_status.php', {
        order_id: orderId,
        status,
      });
      if (response.data.success) {
        if (status === 'approved') {
          await updateStockQuantity(orderDetails.items || []);
        }
        alert('Order status updated successfully');
        fetchOrders(); // Refresh order list after status update
        fetchOrderDetails(orderId); // Refresh order details to reflect status change
      } else {
        alert('Failed to update order status: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Orders List</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Order Details</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => (
            <tr key={order.order_id} style={rowStyle}>
              <td>{order.customer_name}</td>
              <td>{new Date(order.order_date).toLocaleDateString()}</td>
              <td>${order.total_amount}</td>
              <td>{order.status}</td>
              <td>
                <button style={buttonStyle} onClick={() => fetchOrderDetails(order.order_id)}>Order Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <div style={modalHeaderStyle}>
              <h3>Order Details</h3>
            </div>
            <table style={modalTableStyle}>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Color</th>
                  <th>Stock Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items?.map((item, index) => (
                  <tr key={index} style={rowStyle}>
                    <td>{item.product_name || 'N/A'}</td>
                    <td>{item.quantity || 'N/A'}</td>
                    <td>{item.color_name || 'N/A'}</td>
                    <td>{item.stock_amount || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={buttonContainerStyle}>
              {orderDetails.order?.status === 'pending' && (
                <>
                  <button style={actionButtonStyle} onClick={() => updateOrderStatus(selectedOrder, 'approved')}>Approve</button>
                  <button style={actionButtonStyle} onClick={() => updateOrderStatus(selectedOrder, 'rejected')}>Reject</button>
                </>
              )}
              {(orderDetails.order?.status === 'approved' || orderDetails.order?.status === 'rejected') && (
                <button style={actionButtonStyle} onClick={() => updateOrderStatus(selectedOrder, 'pending')}>Revert to Pending</button>
              )}
              <button style={closeButtonStyle} onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const headerStyle = {
  marginBottom: '20px',
  color: '#333',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '20px',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '60%', // Medium size width
  maxWidth: '800px', // Max width for larger screens
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  border: '2px solid #007bff', // Border color
};

const modalHeaderStyle = {
  borderBottom: '2px solid #007bff', // Header border color
  paddingBottom: '10px',
  marginBottom: '10px',
};

const modalTableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '20px',
};

const rowStyle = {
  borderBottom: '1px solid #ddd',
};

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

const actionButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#28a745', // Green for approve
  marginRight: '10px',
};

const closeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#dc3545', // Red for close
};

const buttonContainerStyle = {
  marginTop: '20px',
};

export default ShowOrders;
