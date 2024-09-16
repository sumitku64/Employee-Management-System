import Employee from '../models/Employee.js';
import Salary from '../models/Salary.js'

const addSalary = async (req, res) => {
  const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;
  const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

  try {
    // Create a new department
    const newSalary = new Salary({
        employeeId, basicSalary, allowances, deductions, netSalary: totalSalary, payDate
    });

    // Save department to the database
    await newSalary.save();

    res.status(201).json({success:true, message: 'Salary added successfully' });
  } catch (error) {
    console.error('Error adding department:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
};

const getEmployees = async (req, res) => {
    const {id} = req.params;
  try {
    const employees = await Employee.find({department: id})
    res.status(201).json({success:true, employees });
  } catch (error) {
    console.error('Error getting employees:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

const getSalary = async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id)
    const employee = await Employee.findOne({userId: id})
    const salary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId')    
    res.status(201).json({success:true, salary });
  } catch (error) {
    console.error('Error editing employee:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

export {getEmployees, addSalary, getSalary}