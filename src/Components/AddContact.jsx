import React, { useState } from 'react'
import '../assets/css/Form.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaAt, FaPhoneFlip, FaRegAddressCard, FaUserPlus } from 'react-icons/fa6'

const AddContact = () => {
  const navigate = useNavigate(); // ✅ hook at top level

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'https://contact-mangement-system-gveo.vercel.app/ContactSystem/add-contact', // ✅ correct port
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      toast.success("Contact Created Successfully");
      navigate('/dashboard', { replace: true });


    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Error Creating the Contact");
    }
  };

  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Create Contact</h2>

        <div className="form-group">
          <FaUserPlus />
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={values.name}          // ✅ controlled
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <FaAt />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={values.email}        // ✅ controlled
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <FaPhoneFlip />
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            value={values.phone}        // ✅ controlled
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <FaRegAddressCard />
          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            value={values.address}      // ✅ controlled
            onChange={handleInput}
          />
        </div>

        <button className="form-button">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
