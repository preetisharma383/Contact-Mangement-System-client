import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaCubesStacked,FaUser,FaAddressCard,FaRegAddressCard,FaPowerOff} from "react-icons/fa6";
import '../assets/css/Sidebar.css';
const Sidebar = () => {
  const [activeLink,setActiveLink]=useState(1)
  return (
    <div className='sidebar'>
      <div className="sidebar-item">
        <FaCubesStacked className='top-icon'/>
      </div>
      <div className={`sidebar-item ${activeLink === 0 ? "active":""}`} onClick={()=>setActiveLink(0)}>
        <Link className='sidebar-link' to="/profile"><FaUser className='icon'/>Profile</Link>
      </div>
      <div className={`sidebar-item ${activeLink === 1 ? "active":""}`} onClick={()=>setActiveLink(1)}><Link className='sidebar-link' to="/dashboard"><FaAddressCard className='icon'/>Contacts</Link></div>
      <div className={`sidebar-item ${activeLink === 2 ? "active":""}`} onClick={()=>setActiveLink(2)}><Link className='sidebar-link' to="/dashboard/add-contact"><FaRegAddressCard className='icon'/>Add Contact</Link></div>
      <div className={`sidebar-item ${activeLink === 3 ? "active":""}`} onClick={()=>setActiveLink(3)}><Link className='sidebar-link' to="/logout"><FaPowerOff className='icon'/>Exit</Link></div>
    </div>
  )
}
 
export default Sidebar
