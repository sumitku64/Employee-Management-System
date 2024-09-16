import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/api";

const EditDepartment = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [department, setDepartment] = useState({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {

    setLoading(true);

    const fetchDepartment = async () => {
      try {
        const response = await axiosInstance.get(`/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response)
        if (response.data.success) {
          setDepartment({
            ...department,
            id: response.data.department._id,
            name: response.data.department.name,
            description: response.data.department.description,
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDepartment();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.put(`/department/${id}`, department, {
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
  }

  if(loading) return <div>Loading ...</div>

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
      <form onSubmit={handleUpdate}>
        {/* Department Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Department Name
          </label>
          <input
            type="text"
            name="name"
            value={department.name}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={department.description}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
