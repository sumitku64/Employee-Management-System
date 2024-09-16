import express from "express";
import multer from "multer";
import path from "path";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// Multer configuration for file storage in the public/uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Save files to public/uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp to avoid duplicate names
  },
});

const upload = multer({ storage: storage });

// Route to add a new employee
const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    // Check if user already exists with the same email
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    // Hash the password before storing the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
        name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? `/uploads/${req.file.filename}` : "", // Save image path if uploaded
    });
    const user = await newUser.save();

    // Create new employee
    const newEmployee = new Employee({
        userId: user._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    await newEmployee.save(); 

    res.status(201).json({ success: true, message: "Employee and User created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('userId').populate('department')
    res.status(201).json({success:true, employees });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

const getEmployee = async (req, res) => {
  try {
    const {id} = req.params;
    let employee;
    employee = await Employee.findById({_id: id}).populate('userId').populate('department')
    if(!employee) {
      employee = await Employee.findOne({userId: id}).populate('userId').populate('department')
    }
    res.status(201).json({success:true, employee });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

const updateEmployee = async (req, res) => {
  try {
    const {id} = req.params;
    const {
      userId,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      role,
    } = req.body;

    const user = await User.findById({_id: userId})
    if(!user) {
      res.status(404).json({ success:false, error: "User Not Found" });
    }
    const employeeExist = await Employee.findOne({_id: id})
    if(!employeeExist) {
      res.status(404).json({ success:false, error: "Employee Not Found" });
    }

    const updateUser = await User.findByIdAndUpdate({_id: userId}, {role})

    const employee = await Employee.findByIdAndUpdate({_id: id},
      {
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        salary,
        department
      }
    )
    if(!employee || !updateUser) {
      res.status(404).json({ success:false, error: 'document not found ' });
    }
    res.status(201).json({success:true, employee });
  } catch (error) {
    console.error('Error editing employee:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

const deleteEmployee = async (req, res) => {
  try {
    const {id} = req.params;
  
    const employee = await Employee.findByIdAndDelete({_id: id})
    if(!employee) {
      res.status(404).json({ success:false, error: 'document not found '+error.message });
    }
    res.status(201).json({success:true, employee });
  } catch (error) {
    console.error('Error editing employee:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}


export {addEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee, upload}
