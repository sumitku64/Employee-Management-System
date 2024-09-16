import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axiosInstance from "../utils/api";
import { columns, headCustomStyles } from "../utils/LeaveHelpers";
import { LeaveButtons } from "../utils/LeaveHelpers";

const LeaveList = () => {
  const [loading, setLoading] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [isActive, setIsActive] = useState("");
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const response = await axiosInstance.get("/leaves", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let serialNo = 1;
        const data = await response.data.leaves.map((leave) => ({
          id: leave._id,
          sno: serialNo++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
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
    fetchLeaves();
  }, []);

  const filterLeaves = (q) => {
    const filteredRecords = leaves.filter((leave) =>
      leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
    setFilteredLeaves(filteredRecords);
  };

  const filterButtons = (q) => {
    const filteredRecords = leaves.filter((leave) =>
      leave.status.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
    setIsActive(q);
    setFilteredLeaves(filteredRecords);
  };

  if (loading) {
    <div>Loadding ...</div>;
  }

  return (
    <div className="overflow-x-auto p-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Manage Leaves</h2>
      </div>
      <div className=" flex justify-between my-3 items-center">
        <input
          type="text"
          placeholder="Search By Emp ID"
          className="border px-2 rounded-md py-0.5 border-gray-300"
          onChange={(e) => filterLeaves(e.target.value)}
        />
        <div className="flex space-x-3">
          <button
            className={`${
              isActive === "Pending" ? "bg-teal-800" : "bg-teal-600 "
            } px-3 py-1 text-white rounded hover:bg-teal-800`}
            onClick={() => filterButtons("Pending")}
          >
            Pending
          </button>
          <button
            className={`${
              isActive === "Approved" ? "bg-teal-800" : "bg-teal-600 "
            } px-3 py-1 text-white rounded hover:bg-teal-800`}
            onClick={() => filterButtons("Approved")}
          >
            Approved
          </button>
          <button
            className={`${
              isActive === "Rejected" ? "bg-teal-800" : "bg-teal-600 "
            } px-3 py-1 text-white rounded hover:bg-teal-800`}
            onClick={() => filterButtons("Rejected")}
          >
            Rejected
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredLeaves}
        pagination
        customStyles={headCustomStyles}
      />
    </div>
  );
};

export default LeaveList;
