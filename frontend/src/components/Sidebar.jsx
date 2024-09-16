import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
} from "react-icons/fa";
const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-16 md:w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h2 className="text-2xl hidden md:block text-center font-sevillana">
          Employee MS
        </h2>
        <h2 className="md:hidden text-lg text-center font-sevillana">
          EMS
        </h2>
      </div>
      <div className="px-4">
      <NavLink
        to="/admin-dashboard"
        className={({ isActive }) =>
          `${
            isActive ? "bg-teal-600 " : ""
          } flex items-center justify-center space-x-4 md:justify-start block py-2.5 px-4 rounded hover:bg-gray-700 `
        }
        end
      >
        <FaTachometerAlt />
        <span className="hidden md:inline">Dashboard</span>
      </NavLink>
      <NavLink
        to="/admin-dashboard/employees"
        className={({ isActive }) =>
          `${
            isActive ? "bg-teal-600 " : ""
          } flex items-center justify-center space-x-4 md:justify-start block py-2.5 px-4 rounded hover:bg-gray-700 `
        }
      >
        <FaUsers />
        <span className="hidden md:inline">Employees</span>
      </NavLink>
      <NavLink
        to="/admin-dashboard/departments"
        className={({ isActive }) =>
          `${
            isActive ? "bg-teal-600 " : ""
          } flex items-center justify-center space-x-4 md:justify-start block py-2.5 px-4 rounded hover:bg-gray-700 `
        }
      >
        <FaBuilding />
        <span className="hidden md:inline">Departments</span>
      </NavLink>
      <NavLink
        to="/admin-dashboard/leaves"
        className={({ isActive }) =>
          `${
            isActive ? "bg-teal-600 " : ""
          } flex items-center justify-center space-x-4 md:justify-start block py-2.5 px-4 rounded hover:bg-gray-700 `
        }
      >
        <FaCalendarAlt />
        <span className="hidden md:inline">Leaves</span>
      </NavLink>
      <NavLink
        to="/admin-dashboard/salary"
        className={({ isActive }) =>
          `${
            isActive ? "bg-teal-600 " : ""
          } flex items-center justify-center space-x-4 md:justify-start block py-2.5 px-4 rounded hover:bg-gray-700 `
        }
      >
        <FaMoneyBillWave />
        <span className="hidden md:inline">Salary</span>
      </NavLink>
      <NavLink
        to="/admin-dashboard/setting"
        className={({ isActive }) =>
          `${
            isActive ? "bg-teal-600 " : ""
          } flex items-center justify-center space-x-4 md:justify-start block py-2.5 px-4 rounded hover:bg-gray-700 `
        }
      >
        <FaCogs />
        <span className="hidden md:inline">Setting</span>
      </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
