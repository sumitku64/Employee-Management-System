import Department from '../models/Department.js'
import Employee from '../models/Employee.js';
import Leave from '../models/Leave.js';

const addLeave = async (req, res) => {
  const { userId, leaveType, startDate, endDate, reason } = req.body;

  try {
    const employee = await Employee.findOne({userId: userId})
    // Create a new department
    const newLeave = new Leave({
      employeeId: employee._id, leaveType, startDate, endDate, reason
    });

    // Save department to the database
    await newLeave.save();

    res.status(201).json({success:true, message: 'laeve added successfully' });
  } catch (error) {
    console.error('Error adding leave:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate({
        path: 'employeeId',  // Populate the employee data
        populate: [
          {
            path: 'department',  
            select: 'name'
          },
          {
            path: 'userId',  
            select: 'name' 
          }
        ]
      })
      .exec();
    res.status(201).json({success:true, leaves });
  } catch (error) {
    console.error('Error adding department:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

const getLeave = async (req, res) => {
  try {
    const {id} = req.params;
    let leave;
    leave = await Leave.findById({_id: id})
      .populate({
        path: 'employeeId',  // Populate the employee data
        populate: [
          {
            path: 'department',  
            select: 'name'
          },
          {
            path: 'userId',  
            select: 'name profileImage' 
          }
        ]
      })
      .exec();

      if(!leave) {
        const employee = await Employee.findOne({userId:id})
        leave = await Leave.find({employeeId: employee._id})
      }
      
    res.status(201).json({success:true, leave });
  } catch (error) {
    console.error('Error in leave:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

const getLeaveByUserId = async (req, res) => {
  try {
    const {id} = req.params
    const employee = await Employee.findOne({userId:id})
    const leave = await Leave.find({employeeId: employee._id})
    res.status(201).json({success:true, leave });
  } catch (error) {
    console.error('Error in leave:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

const updateLeave = async (req, res) => {
  try {
    const {id} = req.params;
    const {status} = req.body
    const leave = await Leave.findByIdAndUpdate({_id: id}, {status})
    if(!leave) {
      res.status(404).json({ success:false, error: 'document not found '+error.message });
    }
    res.status(201).json({success:true, leave });
  } catch (error) {
    console.error('Error editing department:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

const deleteDepartment = async (req, res) => {
  try {
    const {id} = req.params;
  
    const department = await Department.findByIdAndDelete({_id: id})
    if(!department) {
      res.status(404).json({ success:false, error: 'document not found '+error.message });
    }
    res.status(201).json({success:true, department });
  } catch (error) {
    console.error('Error editing department:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

export {getLeaves, getLeave, updateLeave, getLeaveByUserId, addLeave}