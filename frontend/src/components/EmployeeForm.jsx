import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { getDepartments } from '../utils/EmployeeHelpers';

const EmployeeForm = () => {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(false)
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    employeeId: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    designation: '',
    department: '',
    salary: '',
    password: '',
    role: '',
    image: null,
  }); 
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const fetchDepartments = async () => {
      const deps = await getDepartments()
      setDepartments(deps)
      setLoading(false)
    }
    fetchDepartments()
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setEmployeeData({ ...employeeData, [name]: files[0] });
    } else {
      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Append each field to the FormData object
    formData.append('name', employeeData.name);
    formData.append('email', employeeData.email);
    formData.append('employeeId', employeeData.employeeId);
    formData.append('dob', employeeData.dob);
    formData.append('gender', employeeData.gender);
    formData.append('maritalStatus', employeeData.maritalStatus);
    formData.append('designation', employeeData.designation);
    formData.append('department', employeeData.department);
    formData.append('salary', employeeData.salary);
    formData.append('password', employeeData.password);
    formData.append('role', employeeData.role);
  
    // Append the image if it exists
    if (employeeData.image) {
      formData.append('image', employeeData.image);
    }
  
    try {
      const token = localStorage.getItem('token')
      const response = await axiosInstance.post('/employees/add', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.data.success) {
        navigate('/admin-dashboard/employees')
      } else {
        // Handle any errors
        console.error('Error adding employee:', response.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };
  
  if(loading) return <div>Loading...</div>

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              placeholder='Insert Name'
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder='Insert Email'
              value={employeeData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              placeholder='Employee ID'
              value={employeeData.employeeId}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              placeholder='DOB'
              value={employeeData.dob}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={employeeData.gender}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Marital Status</label>
            <select
              name="maritalStatus"
              value={employeeData.maritalStatus}
              placeholder="Marital Status"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              placeholder='Designation'
              value={employeeData.designation}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              value={employeeData.department}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              placeholder='Salary'
              value={employeeData.salary}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder='******'
              value={employeeData.password}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={employeeData.role}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              name="image"
              placeholder='Upload Image'
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
