import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import '../assets/css/Dashboard.css'
import Sidebar from '../Components/Sidebar.jsx'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
    <Navbar/>
    <div className="dashboard">
      <div className="sidebar-container">
        <Sidebar/>
      </div>
      <div className="content-container">
        <Outlet/>
      </div>
    </div>
    </>
  )
}

export default Dashboard
