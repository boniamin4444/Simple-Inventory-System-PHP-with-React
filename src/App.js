// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './admin/Layout';
import AdminPanel from './admin/AdminPanel';
import AddProduct from './product/AddProduct';
import ShowProduct from './product/ShowProduct';
import AdminHome from './admin/AdminHome';
import CategoryInsert from './category/CategoryInsert';
import CategoryList from './category/CategoryList';
import EditCategory from './category/EditCategory';  // Ensure you import the correct component
import EditProduct from './product/EditProduct'; 
import CustomerInsert from './customer/CustomerInsert';
import CustomerList from './customer/CustomerList';
import EditCustomer from './customer/EditCustomer';
import OrderPage from './order/OrderPage';
import ShowOrders from './order/ShowOrders';
import InventoryPage from './inventory/InventoryPage';
import Growth from './growth/Growth';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/adminhome" element={<AdminHome />} />  {/* Default route */}
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/showproducts" element={<ShowProduct />} />
          <Route path="/insert_category" element={<CategoryInsert />} />
          <Route path="/view_categoryList" element={<CategoryList />} />
          <Route path="/edit_category/:id" element={<EditCategory />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/customerinsert" element={<CustomerInsert />} />
          <Route path="/customerlist" element={<CustomerList />} />
          <Route path="/edit-customer/:id" element={<EditCustomer />} />
          <Route path="/insert_order" element={<OrderPage />} />
          <Route path="/showorders" element={<ShowOrders />} />
          <Route path="/inventorypage" element={<InventoryPage />} />
          <Route path="/growthshw" element={<Growth />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
