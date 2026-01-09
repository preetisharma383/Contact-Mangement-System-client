import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import { CircleLoader } from 'react-spinners';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const customStyles = {
  headCells: {
    style: {
      fontSize: "15px",
      fontWeight: 600,
    },
  },
  cells: {
    style: {
      fontSize: "13px",
      fontWeight: 500,
    },
  },
};
const MySwal = withReactContent(Swal)
const Contacts = () => {
  
  const location = useLocation();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const deleteRecord = (id) => {
  MySwal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `https://contact-mangement-system-gveo.vercel.app/ContactSystem/contact/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (res.data.success) {
          setContacts(res.data.contacts);

          MySwal.fire({
            title: "Deleted!",
            text: "Contact deleted successfully.",
            icon: "success"
          });
        }
      } catch (error) {
        console.error(error);
        MySwal.fire({
          title: "Error!",
          text: "Failed to delete contact",
          icon: "error"
        });
      }
    }
  });
};

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
    },
    {
      name: 'Action',
      cell: row => (
        <>
       
        <Link to={`/dashboard/edit-contact/${row._id}`}>
          <FaPenToSquare className="table-icon1" />
        </Link>
          <FaRegTrashCan className="table-icon2"  onClick={()=>{deleteRecord(row._id)}}/>
         </>
      ),
    },
  ];

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://contact-mangement-system-gveo.vercel.app/ContactSystem/contacts',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (res.data.success) {
        setContacts(res.data.contacts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [location.pathname]); // ✅ refetch after add/edit navigation

  if (loading) {
    return (
      <div className="loader">
        <CircleLoader size={50} />
      </div>
    );
  }

  return (
    <div className="contact-list">
      <DataTable
        columns={columns}
        data={contacts}
        customStyles={customStyles}
        pagination
        noDataComponent="Add a Contact"
      />
    </div>
  );
};

export default Contacts;
