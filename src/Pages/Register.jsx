import React, { useState } from 'react'
import '../assets/css/Form.css'
import { Link, useNavigate } from 'react-router-dom'
import Validation from '../Components/Validation'
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState([]);

  const navigate = useNavigate();

  const handleInput = (event) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value
    }

    setValues(newValues)
    setErrors(Validation(newValues)) // ✅ validate UPDATED values
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post('https://contact-mangement-system-gveo.vercel.app/ContactSystem/register', values)
        .then((res) => {
          if (res.data.success) {
            toast.success("Account Created Successfully", {
              position: "top-right",
              autoClose: 5000,
            });
            navigate('/login');
          }
        })
        .catch((err) => {
          if (err.response?.data?.errors) {
            setServerErrors(err.response.data.errors);
          } else {
            console.log(err);
          }

          toast.error("Error Creating the account", {
            position: "top-right",
            autoClose: 5000,
          });
        });
    }
  };



  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="form-group">
          <label className='form-label'>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="form-control"
            value={values.name}
            onChange={handleInput}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className='form-label'>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control"
            autoComplete="off"
            value={values.email}
            onChange={handleInput}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className='form-label'>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="******"
            className="form-control"
            value={values.password}
            onChange={handleInput}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        {
        serverErrors.map((error, index) => (
        <p className='error' key={index}>{error.msg}</p>
        ))
        }
        <button className="form-button">Register</button>
        <p>Already Registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default Register
