// Layout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar'; // Import the Sidebar component
import './Layout.css'; // Import the CSS file for styling

const Layout = () => {
  // State to manage the sidebar toggle
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setOpenSidebarToggle(prevState => !prevState);
  };

  return (
    <div className="app-container">
      {/* Pass the toggle function to the Header */}
      <Header openSidebar={toggleSidebar} />
      {/* Pass the state and toggle function to the Sidebar */}
      <Sidebar openSidebarToggle={openSidebarToggle} openSidebar={toggleSidebar} />
      <main className="content">
        <Outlet /> {/* This is where the routed components will be rendered */}
      </main>
    </div>
  );
};

export default Layout;
