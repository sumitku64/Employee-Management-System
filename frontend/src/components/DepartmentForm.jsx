// src/components/forms/DepartmentForm.js
import React, { useState } from 'react';
import axiosInstance from '../utils/api';
import { useNavigate } from 'react-router-dom';

const DepartmentForm = () => {
  const [departmentData, setDepartmentData] = useState({
    name: '',
    description: '',
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData({ ...departmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/department/add', departmentData, {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success) {
        navigate('/admin-dashboard/departments')
      }
    } catch(error) {
      console.log(error)
      if(error.response && !error.response.data.success) {
        alert(error.message)
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Add New Department</h2>
      <form onSubmit={handleSubmit}>
        
          {/* Department Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Department Name</label>
            <input
              type="text"
              name="name"
              value={departmentData.name}
              placeholder='Department Name'
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              placeholder='Description'
              value={departmentData.description}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              rows="4"
            />
          </div>
       

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default DepartmentForm;
