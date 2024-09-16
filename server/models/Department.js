import mongoose from "mongoose";
import { Schema } from "mongoose";
import Employee from "./Employee.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js";

const departmentSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

departmentSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    // Find all employees in this department
    const employees = await Employee.find({ department: this._id });

    // Extract employee IDs
    const employeeIds = employees.map(emp => emp._id);

    // Delete all employees in this department
    await Employee.deleteMany({ department: this._id });

    // Delete leaves associated with these employees
    await Leave.deleteMany({ employeeId: { $in: employeeIds } });

    // Delete payroll records associated with these employees
    await Salary.deleteMany({ employeeId: { $in: employeeIds } });

    next();
  } catch (error) {
    next(error);
  }
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;
