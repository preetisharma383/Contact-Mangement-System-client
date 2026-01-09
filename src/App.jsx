import React from 'react'
import Home from './Pages/Home.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import { ToastContainer } from 'react-toastify';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Pages/Dashboard.jsx';
import Contacts from './Components/Contacts.jsx';
import AddContact from './Components/AddContact.jsx';
import EditContact from './Components/EditContact.jsx';
import Logout from './Components/Logout.jsx';
import Protectedroutes from './Components/Protectedroutes.jsx';
import NotFound from './Pages/NotFound.jsx';

export const UserContext=createContext(null)

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/dashboard',
    element:<Protectedroutes><Dashboard/></Protectedroutes>,
    children:[
      {
        index:true,
        element:<Contacts/>
      },
      {
        path:"/dashboard/add-contact",
        element:<AddContact/>
      },
      {
        path:"/dashboard/edit-contact/:id",
        element:<EditContact/>
      },
    ]
  },
  {
    path:'/logout',
    element:<Logout/>
  },
  {
    path:"*",
    element:<NotFound/>
  }

])

const App = () => {
  const [user,setUser]=useState();
  const token = localStorage.getItem("token");
  if (!token) {
  return; // 🚫 DO NOT CALL VERIFY
}
  useEffect(()=>{
    axios.get(
  'https://contact-mangement-system-gveo.vercel.app/ContactSystem/verify',
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
)
    .then(res=>{
      if(res.data.user){
        setUser(res.data.user)
      }
    }).catch(err=>{
      console.log(err)
    })
  },[])
  return (
    <>
    <ToastContainer/>
    <UserContext.Provider value={{user,setUser}}>
    <RouterProvider router={router}/>
    </UserContext.Provider>
  
    </>
   
  )
}

export default App
