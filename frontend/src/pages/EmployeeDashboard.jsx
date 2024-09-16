import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmpSidebar from "../components/EmpSidebar";

const EmployeeDashboard = () => {
  return (
    <>
      <div className="flex">
        <EmpSidebar />

        <div className="flex-1 ml-16 md:ml-64 bg-gray-100 h-screen">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
