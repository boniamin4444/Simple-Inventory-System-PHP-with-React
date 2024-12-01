import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import './Layout.css'; // Import the CSS file for styling

// The Header component receives `openSidebar` as a prop to open the sidebar
function Header({ openSidebar }) {
  return (
    <header className="header">
      <div className="menu-icon">
        {/* When the menu icon is clicked, it calls the openSidebar function */}
        <BsJustify className="icon" onClick={openSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
        <BsFillBellFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}

export default Header;
