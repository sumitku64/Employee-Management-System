import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import Salary from "../models/Salary.js";

const getSummary = async (req, res) => {
    try {
      // Total Employees
      const totalEmployees = await Employee.countDocuments();
  
      // Total Departments
      const totalDepartments = await Department.countDocuments();
  
      // Total Salaries Paid
      const totalSalaries = await Employee.aggregate([
        { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
      ]);
  
      // Leave Statistics - Get the number of unique employees who have applied for leave
      const employeesAppliedForLeave = await Leave.distinct('employeeId');
  
      // Count leave by status
      const leaveStats = await Leave.aggregate([
        { 
          $group: { 
            _id: "$status", 
            count: { $sum: 1 } 
          } 
        }
      ]);
  
      // Format the leave data
      const leaveSummary = {
        appliedByEmployees: employeesAppliedForLeave.length, // Number of unique employees who applied for leave
        approved: leaveStats.find(item => item._id === "Approved")?.count || 0,
        pending: leaveStats.find(item => item._id === "Pending")?.count || 0,
        rejected: leaveStats.find(item => item._id === "Rejected")?.count || 0,
      };
  
      // Respond with the summary
      res.status(200).json({
        totalEmployees,
        totalDepartments,
        totalSalaries: totalSalaries[0]?.totalSalary || 0,
        leaveSummary
      });
    } catch (error) {
      res.status(500).json({success:false, message: 'Error fetching dashboard summary', error });
    }
  }

export {getSummary}