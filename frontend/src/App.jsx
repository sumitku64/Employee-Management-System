import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Summary from "./components/Summary";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import RoleBasedRoute from "./utils/RoleBasedRoute";
import EmployeeForm from "./components/EmployeeForm";
import DepartmentForm from "./components/DepartmentForm";
import DepartmentList from "./components/DepartmentList";
import EditDepartment from "./components/EditDepartment";
import EditEmployee from "./components/EditEmployee";
import ViewEmployee from "./components/ViewEmployee";
import LeaveList from "./components/LeaveList";
import ViewLeave from "./components/ViewLeave";
import SalaryForm from "./components/SalaryForm";
import Setting from "./components/Setting";
import EmpSummary from "./components/EmpSummary";
import EmpLeave from "./components/EmpLeave";
import EmpSalary from "./components/EmpSalary";
import LeaveForm from "./components/LeaveForm";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute>
            <RoleBasedRoute requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoute>
          </PrivateRoute>
        }
      >
        <Route index element={<Summary />}></Route>
        <Route
          path="/admin-dashboard/employees"
          element={
            <RoleBasedRoute requiredRole={["admin"]}>
              <EmployeeTable />
            </RoleBasedRoute>
          }
        ></Route>
        <Route
          path="/admin-dashboard/add-new-employee"
          element={<EmployeeForm />}
        ></Route>
        <Route
          path="/admin-dashboard/employee/:id"
          element={
            <RoleBasedRoute requiredRole={["admin"]}>
              <ViewEmployee />
            </RoleBasedRoute>
          }
        ></Route>
        <Route
          path="/admin-dashboard/employee/edit/:id"
          element={
            <RoleBasedRoute requiredRole={["admin"]}>
              <EditEmployee />
            </RoleBasedRoute>
          }
        ></Route>
        <Route
          path="/admin-dashboard/departments"
          element={
            <RoleBasedRoute requiredRole={["admin"]}>
              <DepartmentList />
            </RoleBasedRoute>
          }
        ></Route>
        <Route
          path="/admin-dashboard/departments/:id"
          element={
            <RoleBasedRoute requiredRole={["admin"]}>
              <EditDepartment />
            </RoleBasedRoute>
          }
        ></Route>
        <Route
          path="/admin-dashboard/add-new-department"
          element={<DepartmentForm />}
        ></Route>

        <Route
          path="/admin-dashboard/leaves"
          element={
            <RoleBasedRoute requiredRole={["admin"]}>
              <LeaveList />
            </RoleBasedRoute>
          }
        ></Route>
        <Route
          path="/admin-dashboard/leave/:id"
          element={
            <RoleBasedRoute requiredRole={["admin"]}>
              <ViewLeave />
            </RoleBasedRoute>
          }
        ></Route>

        <Route path="/admin-dashboard/leave/employee/:id" element={<EmpLeave />}></Route>

        <Route
          path="/admin-dashboard/salary"
          element={
            <RoleBasedRoute requiredRole={["admin"]}>
              <SalaryForm />
            </RoleBasedRoute>
          }
        ></Route>

        <Route
          path="/admin-dashboard/salary/:id"
          element={
            <RoleBasedRoute requiredRole={["admin", "employee"]}>
              <EmpSalary />
            </RoleBasedRoute>
          }
        ></Route>

        <Route
          path="/admin-dashboard/setting"
          element={
            <RoleBasedRoute requiredRole={["admin"]}>
              <Setting />
            </RoleBasedRoute>
          }
        />
      </Route>

      <Route
        path="/employee-dashboard"
        element={
          <PrivateRoute>
            <RoleBasedRoute requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBasedRoute>
          </PrivateRoute>
        }
      >
        <Route index element={<EmpSummary />}></Route>
        <Route
          path="/employee-dashboard/profile/:id"
          element={
            <PrivateRoute>
              <ViewEmployee />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/employee-dashboard/leave/:id" element={<EmpLeave />}></Route>
        <Route
          path="/employee-dashboard/salary/:id"
          element={
            <PrivateRoute>
              <EmpSalary />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/employee-dashboard/setting"
          element={
            <PrivateRoute>
              <Setting />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/employee-dashboard/add-new-leave"
          element={
            <PrivateRoute>
              <LeaveForm />
            </PrivateRoute>
          }
        ></Route>
      </Route>
    </Routes>
  </Router>
);

export default App;
