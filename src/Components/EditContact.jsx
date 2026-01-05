import React, { useEffect, useState } from 'react';
import '../assets/css/Form.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaAt,
  FaPhoneFlip,
  FaRegAddressCard,
  FaUserPlus
} from 'react-icons/fa6';

const EditContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // 🔹 fetch contact by id
 useEffect(() => {
  axios.get(
    `https://contact-mangement-system-gveo.vercel.app/ContactSystem/contact/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  ).then(res => {
    if (res.data.success) {
      setValues(res.data.contact); // ✅ THIS is the key
    }
  }).catch(err => {
    console.log(err);
  });
}, [id]);


  const handleInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 update contact
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.put(
      `https://contact-mangement-system-gveo.vercel.app/ContactSystem/update-contact/${id}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (res.data.success) {
      toast.success("Contact updated successfully");
      navigate('/dashboard'); // ✅ correct page
    }
  } catch (err) {
    console.error(err);
    toast.error("Error updating contact");
  }
};


  return (
    <div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Edit Contact</h2>

        <div className="form-group">
          <FaUserPlus />
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleInput}
            placeholder="Enter Name"
          />
        </div>

        <div className="form-group">
          <FaAt />
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleInput}
            placeholder="Enter Email"
          />
        </div>

        <div className="form-group">
          <FaPhoneFlip />
          <input
            type="text"
            name="phone"
            value={values.phone}
            onChange={handleInput}
            placeholder="Enter Phone Number"
          />
        </div>

        <div className="form-group">
          <FaRegAddressCard />
          <input
            type="text"
            name="address"
            value={values.address}
            onChange={handleInput}
            placeholder="Enter Address"
          />
        </div>

        <button className="form-button">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
