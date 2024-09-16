import { useNavigate } from "react-router-dom";
import axiosInstance from "./api";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "100px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "100px",
  },
  {
    name: "DOB",
    selector: (row) => new Date(row.dob).toLocaleDateString(),
    width: "100px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "150px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

export const getDepartments = async () => {
  let departments;
  try {
    const response = await axiosInstance.get("/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    console.log(error);
    if (error.response && !error.response.data.success) {
      alert(error.message);
    }
  }
  return departments;
};

export const EmployeeButtons = ({ Id, userId }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/employee/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin-dashboard/employee/edit/${id}`);
  };

  const handleSalary = (id) => {
    navigate(`/admin-dashboard/salary/${id}`);
  };

  const handleLeave = (id) => {
    navigate(`/admin-dashboard/leave/employee/${id}`);
  }

  return (
    <div className="flex space-x-3">
      <button
        className="px-4 py-1 bg-blue-400 rounded"
        onClick={() => handleView(Id)}
      >
        View
      </button>
      <button
        className="px-4 py-1 bg-green-400 rounded"
        onClick={() => handleEdit(Id)}
      >
        Edit
      </button>
      <button className="px-4 py-1 bg-yellow-400 rounded"
        onClick={() => handleSalary(userId)}
      >Salary</button>
      <button className="px-4 py-1 bg-red-400 rounded"
      onClick={() => handleLeave(userId)}
      >Leave</button>
    </div>
  );
};

export const headCustomStyles = {
  headCells: {
    style: {
      fontSize: "15px",
      fontWeight: "bolder",
    },
  },
};

export const dateFormat = (date) => {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${newDate.getDate().toString().padStart(2, "0")}`;
};

// salary form 
export const fetchEmployees = async (depId) => {
  let employees;
  try {
    const response = await axiosInstance.get(`/salary/employees/${depId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data)
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    console.log(error);
    if (error.response && !error.response.data.success) {
      alert(error.message);
    }
  }
  return employees;
}