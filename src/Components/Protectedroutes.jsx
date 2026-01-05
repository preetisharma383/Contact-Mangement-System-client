import React from 'react'
import { Navigate } from 'react-router-dom'

const Protectedroutes = ({children}) => {
 const token=localStorage.getItem('token')
 return token ? children:<Navigate to="/login"replace/>
}

export default Protectedroutes
