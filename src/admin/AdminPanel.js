import React from 'react';
import {useState} from 'react';
import './AdminApp.css';
import Header from './Header';
import Sidebar from './Sidebar';
import AdminHome from './AdminHome';


const AdminPanel = () =>
{
const [openSidebarToggle, setOpenSidebarToggole] = useState(false);

const openSidebar = () =>
{
	setOpenSidebarToggole(!openSidebarToggle)
}


	return(

			<div className="grid-container mybody">
				<Header openSidebar = {openSidebar} />
				<Sidebar openSidebarToggle={openSidebarToggle} openSidebar={openSidebar}/>
								
               
				<AdminHome />
			</div>
		);
}

export default AdminPanel;