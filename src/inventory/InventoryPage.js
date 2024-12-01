import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [overview, setOverview] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch inventory data
        const inventoryResponse = await axios.get('http://localhost/myinventory/backend/inventory/inventory.php');
        console.log('Inventory Data:', inventoryResponse.data); // Debug log
        setInventory(inventoryResponse.data.inventory || []);

        // Fetch overview data
        const overviewResponse = await axios.get('http://localhost/myinventory/backend/inventory/overview.php');
        console.log('Overview Data:', overviewResponse.data); // Debug log
        setOverview(overviewResponse.data || {});

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err); // Debug log
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Pagination logic
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = inventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(inventory.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const formatNumber = (num) => (typeof num === 'number' ? num.toFixed(2) : '0.00');

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>
      {/* Inventory Table Container */}
      <div style={{ flex: 2, border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
        <h2>Inventory Management</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.product_name}</td>
                  <td>{item.category_name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.stock_amount} pcs</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No inventory data available.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ marginTop: '20px' }}>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span> {currentPage} of {totalPages} </span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

      {/* Overview Container */}
      <div style={{ flex: 1, border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
        <h3>Overview</h3>
        <p>Total Product: {overview.totalProduct || 0}</p>
        <p>Today Sell: ${formatNumber(overview.todaySell || 0)}</p>
        <p>Yesterday Sell: ${formatNumber(overview.yesterdaySell || 0)}</p>
        <p>Total Sell: ${formatNumber(overview.totalSell || 0)}</p>
        <p>Product Reserved: {formatNumber(overview.productReserved || 0)}</p>
        <p>Stock Issues: {formatNumber(overview.stockIssues || 0)}</p>
      </div>
    </div>
  );
}
