import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";

const EmpLeave = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);
  const { id } = useParams()
  const {user} = useAuth()
  let sno = 1;

  const fetchLeaves = async () => {
    try {
      const response = await axiosInstance.get(`/leaves/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (response.data.success) {
        setLeaves(response.data.leave);
        setFilteredLeaves(response.data.leave);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterLeaves = (q) => {
    const filteredRecords = leaves.filter((leave) =>
      leave.status.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
    setFilteredLeaves(filteredRecords);
  };

  return (
    <>
      {filteredLeaves === null ? (
        <div>Loading ...</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Manage Leaves</h2>
          </div>
          <div className=" flex justify-between my-3 items-center">
            <input
              type="text"
              placeholder="Search By Status"
              className="border px-2 rounded-md py-0.5 border-gray-300"
              onChange={filterLeaves}
            />
            {user.role === "employee" ? (
              <Link
              to="/employee-dashboard/add-new-leave"
              className="border px-6 py-1 bg-teal-600 rounded text-white font-bold"
            >
              Add Leave
            </Link>
            ) : null}
            
          </div>
            {filteredLeaves.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">SNO</th>
                <th className="px-6 py-3">Leave Type</th>
                <th className="px-6 py-3">From</th>
                <th className="px-6 py-3">To</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Applied Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-3">{sno++}</td>
                  <td className="px-6 py-3">{leave.leaveType}</td>
                  <td className="px-6 py-3">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">{leave.reason}</td>
                  <td className="px-6 py-3">
                    {new Date(leave.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          ): <div>No Records</div>}
        </div>
      )}
    </>
  );
};

export default EmpLeave;
