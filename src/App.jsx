import React, { createContext, useState, useEffect } from 'react';
import Home from './Pages/Home.jsx';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Contacts from './Components/Contacts.jsx';
import AddContact from './Components/AddContact.jsx';
import EditContact from './Components/EditContact.jsx';
import Logout from './Components/Logout.jsx';
import Protectedroutes from './Components/Protectedroutes.jsx';
import NotFound from './Pages/NotFound.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

export const UserContext = createContext(null);

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
  {
    path: '/dashboard',
    element: <Protectedroutes><Dashboard /></Protectedroutes>,
    children: [
      { index: true, element: <Contacts /> },
      { path: 'add-contact', element: <AddContact /> },
      { path: 'edit-contact/:id', element: <EditContact /> },
    ]
  },
  { path: '/logout', element: <Logout /> },
  { path: '*', element: <NotFound /> },
]);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios.get('https://contact-mangement-system-gveo.vercel.app/ContactSystem/verify', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.data.user) setUser(res.data.user);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
};

export default App;
