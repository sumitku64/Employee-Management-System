import {
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/api";

const Summary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const cardSummary = async () => {
      try {
        const response = await axiosInstance.get("/dashboard/summary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        setSummary(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    cardSummary();
  }, []);

  return (
    <>
      {summary ? (
        <div className="p-6">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
            <div className="rounded flex bg-white">
              <div className="text-3xl flex justify-center items-center bg-teal-600 text-white px-4">
                <FaUsers />
              </div>
              <div className="pl-4 py-1">
                <p className="text-lg font-semibold">Total Employees</p>
                <p className="text-xl font-bold">{summary.totalEmployees}</p>
              </div>
            </div>

            <div className="rounded flex bg-white">
              <div className="text-3xl flex justify-center items-center bg-yellow-500 text-white px-4">
                <FaBuilding />
              </div>
              <div className="pl-4 py-1">
                <p className="text-lg font-semibold">Total Departments</p>
                <p className="text-xl font-bold">{summary.totalDepartments}</p>
              </div>
            </div>
            <div className="rounded flex bg-white">
              <div className="text-3xl flex justify-center items-center bg-red-600 text-white px-4">
                <FaMoneyBillWave />
              </div>
              <div className="pl-4 py-1">
                <p className="text-lg font-semibold">Monthly Pay</p>
                <p className="text-xl font-bold">${summary.totalSalaries}</p>
              </div>
            </div>
          </div>
          {/* admin and employees list  */}
          <div className="mt-12">
            <h4 className="text-center text-2xl font-bold">Leave Details</h4>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="rounded flex bg-white">
                <div className="text-3xl flex justify-center items-center bg-teal-600 text-white px-4">
                  <FaFileAlt />
                </div>
                <div className="pl-4 py-1">
                  <p className="text-lg font-semibold">Leave Applied</p>
                  <p className="text-xl font-bold">
                    {summary.leaveSummary.appliedByEmployees}
                  </p>
                </div>
              </div>

              <div className="rounded flex bg-white">
                <div className="text-3xl flex justify-center items-center bg-green-500 text-white px-4">
                  <FaCheckCircle />
                </div>
                <div className="pl-4 py-1">
                  <p className="text-lg font-semibold">Leave Approved</p>
                  <p className="text-xl font-bold">
                    {summary.leaveSummary.approved}
                  </p>
                </div>
              </div>
              <div className="rounded flex bg-white">
                <div className="text-3xl flex justify-center items-center bg-yellow-500 text-white px-4">
                  <FaHourglassHalf />
                </div>
                <div className="pl-4 py-1">
                  <p className="text-lg font-semibold">Leave Pending</p>
                  <p className="text-xl font-bold">
                    {summary.leaveSummary.pending}
                  </p>
                </div>
              </div>

              <div className="rounded flex bg-white">
                <div className="text-3xl flex justify-center items-center bg-red-600 text-white px-4">
                  <FaTimesCircle />
                </div>
                <div className="pl-4 py-1">
                  <p className="text-lg font-semibold">Leave Rejected</p>
                  <p className="text-xl font-bold">
                    {summary.leaveSummary.rejected}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default Summary;
