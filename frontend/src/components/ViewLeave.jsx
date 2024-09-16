import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/api";

const ViewLeave = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [leave, setLeave] = useState({
    _id: "",
    employeeId: { userId: {}, department: {} },
    leaveType: "",
    reason: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const changeStatus = async (id, status) => {
    setLoading(true);
      try {
        const response = await axiosInstance.put(`/leaves/${id}`,{status}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          navigate('/admin-dashboard/leaves')
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.message);
        }
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    const fetchLeave = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/leaves/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.message);
        }
      }
      setLoading(false);
    };
    fetchLeave();
  }, []);

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={`http://localhost:3000/${leave.employeeId.userId.profileImage}`}
            alt=""
            className="rounded-full border w-72"
          />
        </div>
        <div>
          <div className="flex space-x-3 mb-2">
            <p className="text-lg font-bold">Name:</p>
            <p className="font-medium">{leave.employeeId.userId.name}</p>
          </div>
          <div className="flex space-x-3 mb-2">
            <p className="text-lg font-bold">Employee ID:</p>
            <p className="font-medium">{leave.employeeId.employeeId}</p>
          </div>

          <div className="flex space-x-3 mb-2">
            <p className="text-lg font-bold">Leave Type:</p>
            <p className="font-medium">{leave.leaveType}</p>
          </div>
          <div className="flex space-x-3 mb-2">
            <p className="text-lg font-bold">Reason:</p>
            <p className="font-medium">{leave.reason}</p>
          </div>

          <div className="flex space-x-3 mb-2">
            <p className="text-lg font-bold">Department:</p>
            <p className="font-medium">{leave.employeeId.department.name}</p>
          </div>
          <div className="flex space-x-3 mb-2">
            <p className="text-lg font-bold">Start Date:</p>
            <p className="font-medium">
              {new Date(leave.startDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-3 mb-2">
            <p className="text-lg font-bold">End Date:</p>
            <p className="font-medium">
              {new Date(leave.endDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-3 mb-2">
            <p className="text-lg font-bold">
              {leave.status == "Pending" ? "Action:" : "Status:"}
            </p>

            {leave.status == "Pending" ? (
              <div className="flex space-x-3">
                <button className="bg-green-500 text-white rounded px-4 py-1"
                onClick={() => changeStatus(leave._id, "Approved")}>
                  Accept
                </button>
                <button className="bg-red-500 text-white rounded px-4 py-1"
                onClick={() => changeStatus(leave._id, "Rejected")}>
                  Reject
                </button>
              </div>
            ) : (
              <p className="font-medium">{leave.status}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLeave;
