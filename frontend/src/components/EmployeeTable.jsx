import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axiosInstance from "../utils/api";
import { columns, headCustomStyles } from "../utils/EmployeeHelpers";
import { EmployeeButtons } from "../utils/EmployeeHelpers";

const EmployeeTable = () => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("/employees", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data)
        if (response.data.success) {
          let serialNo = 1;
          const data = await response.data.employees.map((emp) => ({
            id: emp._id,
            employeeId: emp.employeeId,
            sno: serialNo++,
            profileImage: <img width={40} className="rounded-full" src={`http://localhost:3000/${emp.userId.profileImage}`}></img>,
            name: emp.userId.name,
            dob: emp.dob,
            department: emp.department.name,
            action: (
              <EmployeeButtons
                Id={emp._id}
                userId={emp.userId._id}
              />
            ),
          }));
          setEmployees(data);
          setFilteredEmployees(data);
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
    fetchEmployees();
  }, []);

  const searchEmployees = (e) => {
    const searchedEmployees = employees.filter((emp) =>
      emp.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(searchedEmployees);
  };

  if (loading) {
    <div>Loadding ...</div>;
  }

  return (
    <div className="overflow-x-auto p-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Manage Employees</h2>
      </div>
      <div className=" flex justify-between my-3 items-center">
        <input
          type="text"
          placeholder="Search By Employee ID"
          className="border px-2 rounded-md py-0.5 border-gray-300"
          onChange={searchEmployees}
        />
        <Link
          to="/admin-dashboard/add-new-employee"
          className="border px-6 py-1 bg-teal-600 rounded text-white font-bold"
        >
          Add New Employee
        </Link>
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination
          customStyles={headCustomStyles}
        />
      </div>
    </div>
  );
};

export default EmployeeTable;
