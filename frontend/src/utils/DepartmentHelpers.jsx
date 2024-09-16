import { useNavigate } from "react-router-dom";
import axiosInstance from "./api";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department",
    selector: (row) => row.name,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin-dashboard/departments/${id}`);
  };

  const handleDelete = async (id) => {
    const isDelete = window.confirm("Delete Record");
    if (isDelete) {
      try {
        const response = await axiosInstance.delete(`/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          onDepartmentDelete(id)
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.message);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-4 py-1 bg-green-400 rounded"
        onClick={() => handleEdit(Id)}
      >
        Edit
      </button>
      <button
        className="px-4 py-1 bg-red-400 rounded"
        onClick={() => handleDelete(Id)}
      >
        Delete
      </button>
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
