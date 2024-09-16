import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axiosInstance from "../utils/api";
import { columns, headCustomStyles } from "../utils/DepartmentHelpers";
import { DepartmentButtons } from "../utils/DepartmentHelpers";

const DepartmentList = () => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = (id) => {
    setLoading(true);
    const newFilter = departments.filter((dep) => dep.id !== id);
    setFilteredDepartments(newFilter);
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    try {
      const response = await axiosInstance.get("/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let serialNo = 1;
        const data = await response.data.departments.map((dep) => ({
          id: dep._id,
          sno: serialNo++,
          name: dep.name,
          action: (
            <DepartmentButtons
              Id={dep._id}
              onDepartmentDelete={onDepartmentDelete}
            />
          ),
        }));
        setDepartments(data);
        setFilteredDepartments(data);
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

  useEffect(() => {
    setLoading(true);
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const filteredRecords = departments.filter((dep) =>
      dep.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    setFilteredDepartments(filteredRecords);
  };

  if (loading) {
    <div>Loadding ...</div>;
  }

  return (
    <div className="overflow-x-auto p-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Manage Departments</h2>
      </div>
      <div className=" flex justify-between my-3 items-center">
        <input
          type="text"
          placeholder="Search By Department"
          className="border px-2 rounded-md py-0.5 border-gray-300"
          onChange={filterDepartments}
        />
        <Link
          to="/admin-dashboard/add-new-department"
          className="border px-6 py-1 bg-teal-600 rounded text-white font-bold"
        >
          Add New Department
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={filteredDepartments}
        pagination
        customStyles={headCustomStyles}
      />
    </div>
  );
};

export default DepartmentList;
