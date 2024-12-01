import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function OrderPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchCustomers();
    fetchColors();
    fetchOrders();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios('http://localhost/myinventory/backend/order/categories.php');
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios('http://localhost/myinventory/backend/order/products.php');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const { data } = await axios('http://localhost/myinventory/backend/order/customers.php');
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchColors = async () => {
    try {
      const { data } = await axios('http://localhost/myinventory/backend/order/colors.php');
      setColors(data);
    } catch (error) {
      console.error('Error fetching colors:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios('http://localhost/myinventory/backend/order/orders.php');
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

  const handleAddOrder = async () => {
    if (orderItems.length === 0 || !selectedCustomer) {
      alert('Please add items to the order and select a customer.');
      return;
    }

    const orderData = {
      customer_id: selectedCustomer,
      items: orderItems,
    };

    try {
      const { data } = await axios.post('http://localhost/myinventory/backend/order/create_order.php', orderData);
      alert(`Order created with ID: ${data.order_id}`);
      setOrderItems([]);
      fetchOrders();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const addItemToOrder = () => {
    if (!selectedProduct || !selectedColor || quantity <= 0) {
      alert('Please select a product, color, and enter a valid quantity.');
      return;
    }

    setOrderItems([
      ...orderItems,
      {
        product_id: selectedProduct,
        color_id: selectedColor,
        quantity,
      },
    ]);
    setSelectedProduct('');
    setSelectedColor('');
    setQuantity(1);
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.post('http://localhost/myinventory/backend/order/update_order_status.php', {
        order_id: orderId,
        status,
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating ordern nn  status:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Order Management</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>Category: </label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Product: </label>
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">Select a product</option>
          {products.map((prod) => (
            <option key={prod.id} value={prod.id}>{prod.product_name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Color: </label>
        <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
          <option value="">Select a color</option>
          {colors.map((color) => (
            <option key={color.id} value={color.id}>{color.color_name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Customer: </label>
        <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
          <option value="">Select a customer</option>
          {customers.map((cust) => (
            <option key={cust.id} value={cust.id}>{cust.full_name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Quantity: </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          style={{ marginRight: '10px' }}
        />
        <button onClick={addItemToOrder}>Add Item</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleAddOrder}>Create Order</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Color</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.customer_name}</td>
              <td>{order.product_name}</td>
              <td>{order.color_name}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'pending' && (
                  <button onClick={() => updateOrderStatus(order.order_id, 'approved')}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
