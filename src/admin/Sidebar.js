import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsEnvelopePaperHeartFill,
  BsPerson, BsBox, BsFileText, BsGraphUp, BsCashStack, BsWallet2
} from 'react-icons/bs';
import { Nav, NavItem, NavLink } from 'react-bootstrap';

function Sidebar({ openSidebarToggle, openSidebar }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get('http://localhost/basic_react/backend/get_feedback.php');
        const unreadFeedback = response.data.filter(feedback => feedback.status === 'unread');
        setUnreadCount(unreadFeedback.length);
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
  }, []);

  const handleMenuToggle = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <aside className={`sidebar ${openSidebarToggle ? 'sidebar-responsive' : ''}`}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon-header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={openSidebar}>X</span>
      </div>

      <Nav className="flex-column sidebar-list">
        <NavItem className="sidebar-list-item">
          <NavLink as={Link} to="/adminhome" className="d-flex align-items-center">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </NavLink>
        </NavItem>

        <NavItem className={`sidebar-list-item ${activeMenu === 'products' ? 'active' : ''}`}>
          <NavLink onClick={() => handleMenuToggle('products')} className="d-flex align-items-center">
            <BsFillGrid3X3GapFill className="icon" /> Products
          </NavLink>
          {activeMenu === 'products' && (
            <Nav className="flex-column sidebar-submenu">
              <NavItem><NavLink as={Link} to="/showproducts"><BsBox className="icon" /> View Products</NavLink></NavItem>
              <NavItem><NavLink as={Link} to="/addproduct"><BsBox className="icon" /> Add Product</NavLink></NavItem>
            </Nav>
          )}
        </NavItem>

        <NavItem className={`sidebar-list-item ${activeMenu === 'categories' ? 'active' : ''}`}>
          <NavLink onClick={() => handleMenuToggle('categories')} className="d-flex align-items-center">
            <BsFillArchiveFill className="icon" /> Categories
          </NavLink>
          {activeMenu === 'categories' && (
            <Nav className="flex-column sidebar-submenu">
              <NavItem><NavLink as={Link} to="/view_categoryList"><BsBox className="icon" /> View Categories</NavLink></NavItem>
              <NavItem><NavLink as={Link} to="/insert_category"><BsBox className="icon" /> Add Category</NavLink></NavItem>
            </Nav>
          )}
        </NavItem>

        <NavItem className={`sidebar-list-item ${activeMenu === 'customers' ? 'active' : ''}`}>
          <NavLink onClick={() => handleMenuToggle('customers')} className="d-flex align-items-center">
            <BsPeopleFill className="icon" /> Customers
          </NavLink>
          {activeMenu === 'customers' && (
            <Nav className="flex-column sidebar-submenu">
              <NavItem><NavLink as={Link} to="/customerlist"><BsPerson className="icon" /> View Customers</NavLink></NavItem>
              <NavItem><NavLink as={Link} to="/customerinsert"><BsPerson className="icon" /> Add Customer</NavLink></NavItem>
            </Nav>
          )}
        </NavItem>

        <NavItem className={`sidebar-list-item ${activeMenu === 'sales' ? 'active' : ''}`}>
          <NavLink onClick={() => handleMenuToggle('sales')} className="d-flex align-items-center">
            <BsCashStack className="icon" /> Sales
          </NavLink>
          {activeMenu === 'sales' && (
            <Nav className="flex-column sidebar-submenu">
              <NavItem><NavLink as={Link} to="/showorders"><BsFileText className="icon" /> View Sales</NavLink></NavItem>
              <NavItem><NavLink as={Link} to="/insert_order"><BsFileText className="icon" /> Add Sale</NavLink></NavItem>
            </Nav>
          )}
        </NavItem>

        <NavItem className={`sidebar-list-item ${activeMenu === 'inventory' ? 'active' : ''}`}>
          <NavLink onClick={() => handleMenuToggle('inventory')} className="d-flex align-items-center">
            <BsListCheck className="icon" /> Inventory
          </NavLink>
          {activeMenu === 'inventory' && (
            <Nav className="flex-column sidebar-submenu">
              <NavItem><NavLink as={Link} to="/inventorypage"><BsBox className="icon" /> Manage Inventory</NavLink></NavItem>
            </Nav>
          )}
        </NavItem>

        <NavItem className={`sidebar-list-item ${activeMenu === 'growth' ? 'active' : ''}`}>
          <NavLink onClick={() => handleMenuToggle('growth')} className="d-flex align-items-center">
            <BsGraphUp className="icon" /> Growth
          </NavLink>
          {activeMenu === 'growth' && (
            <Nav className="flex-column sidebar-submenu">
              <NavItem><NavLink as={Link} to="/growthshw"><BsGraphUp className="icon" /> Overview</NavLink></NavItem>
            </Nav>
          )}
        </NavItem>

        <NavItem className={`sidebar-list-item ${activeMenu === 'revenue' ? 'active' : ''}`}>
          <NavLink onClick={() => handleMenuToggle('revenue')} className="d-flex align-items-center">
            <BsWallet2 className="icon" /> Revenue
          </NavLink>
          {activeMenu === 'revenue' && (
            <Nav className="flex-column sidebar-submenu">
              <NavItem><NavLink as={Link} to="/revenue_overview"><BsWallet2 className="icon" /> Overview</NavLink></NavItem>
            </Nav>
          )}
        </NavItem>

        <NavItem className={`sidebar-list-item ${activeMenu === 'reports' ? 'active' : ''}`}>
          <NavLink onClick={() => handleMenuToggle('reports')} className="d-flex align-items-center">
            <BsMenuButtonWideFill className="icon" /> Reports
          </NavLink>
          {activeMenu === 'reports' && (
            <Nav className="flex-column sidebar-submenu">
              <NavItem><NavLink as={Link} to="/sales_reports"><BsFileText className="icon" /> Sales Reports</NavLink></NavItem>
              <NavItem><NavLink as={Link} to="/inventory_reports"><BsFileText className="icon" /> Inventory Reports</NavLink></NavItem>
              <NavItem><NavLink as={Link} to="/customer_reports"><BsFileText className="icon" /> Customer Reports</NavLink></NavItem>
            </Nav>
          )}
        </NavItem>

        <NavItem className="sidebar-list-item">
          <NavLink as={Link} to="/feedback" className="d-flex align-items-center">
            <BsEnvelopePaperHeartFill className="icon" /> Feedback
          </NavLink>
          {unreadCount > 0 && (
            <span className="info-span">new-{unreadCount}</span>
          )}
        </NavItem>

        <NavItem className="sidebar-list-item">
          <NavLink as={Link} to="/settings" className="d-flex align-items-center">
            <BsFillGearFill className="icon" /> Settings
          </NavLink>
        </NavItem>
      </Nav>
    </aside>
  );
}

export default Sidebar;
