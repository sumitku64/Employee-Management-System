import React from "react";
import { FaUsers } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const EmpSummary = () => {
  const { user } = useAuth();
  return (
    <>
      {user && (
        <div className="rounded flex bg-white mx-5 mt-5">
          <div className="text-3xl flex justify-center items-center bg-teal-600 text-white px-4">
            <FaUsers />
          </div>
          <div className="pl-4 py-1">
            <p className="text-lg font-semibold">Welcome Back</p>
            <p className="text-xl font-bold">{user.name}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EmpSummary;
