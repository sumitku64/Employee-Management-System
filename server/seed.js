import bcrypt from "bcrypt";
import User from "./models/User.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import Leave from "./models/Leave.js";
import mongoose from "mongoose";
import Employee from './models/Employee.js'

connectToMongoDB()

const Register = async () => {
    try {
      const name = "Admin"
      const email = "Admin@gmail.com"
      const password = "admin"    
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: 'admin'
      });
      await newUser.save();
      console.log("admin created")
    } catch (err) {
      console.log(err);
    }
  };

  const seedLeaves = async () => {
    try {
      // Fetch some employee IDs from the Employee collection (modify this query as needed)
      const employees = await Employee.find().limit(2); // Adjust as per your employee count
      
      if (!employees || employees.length === 0) {
        console.log('No employees found. Please add employees before adding leave data.');
        return;
      }
  
      const leaves = [
        {
          employeeId: employees[0]._id, // Assuming employee 1
          leaveType: 'Sick Leave',
          startDate: new Date('2024-09-01'),
          endDate: new Date('2024-09-05'),
          reason: 'High fever and flu',
          status: 'Pending'
        },
        {
          employeeId: employees[1]._id, // Assuming employee 2
          leaveType: 'Casual Leave',
          startDate: new Date('2024-10-10'),
          endDate: new Date('2024-10-20'),
          reason: 'Family vacation',
          status: 'Approved'
        }
      ];
  
      // Insert leaves into the Leave collection
      await Leave.insertMany(leaves);
      console.log('Leave data seeded successfully!');
      
    } catch (error) {
      console.error('Error seeding leave data:', error);
    }
  };
  
  // Run the seed function
  seedLeaves();