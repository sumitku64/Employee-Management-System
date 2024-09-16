import Department from '../models/Department.js'

const addDepartment = async (req, res) => {
  const { name, description } = req.body;

  try {
    // Create a new department
    const newDepartment = new Department({
      name,
      description,
    });

    // Save department to the database
    await newDepartment.save();

    res.status(201).json({success:true, message: 'Department added successfully' });
  } catch (error) {
    console.error('Error adding department:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
    res.status(201).json({success:true, departments });
  } catch (error) {
    console.error('Error adding department:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

const getDepartment = async (req, res) => {
  try {
    const {id} = req.params;
    const department = await Department.findById({_id: id})
    res.status(201).json({success:true, department });
  } catch (error) {
    console.error('Error editing department:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

const updateDepartment = async (req, res) => {
  try {
    const {id} = req.params;
    const {name, description} = req.body
    const department = await Department.findByIdAndUpdate({_id: id}, {name, description})
    if(!department) {
      res.status(404).json({ success:false, error: 'document not found '+error.message });
    }
    res.status(201).json({success:true, department });
  } catch (error) {
    console.error('Error editing department:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

const deleteDepartment = async (req, res) => {
  try {
    const {id} = req.params;
  
    const department = await Department.findById({_id: id})
    if(!department) {
      res.status(404).json({ success:false, error: 'document not found '+error.message });
    }
    await department.deleteOne();
    res.status(201).json({success:true, department });
  } catch (error) {
    console.error('Error editing department:', error);
    res.status(500).json({ success:false, error: 'Server error '+error.message });
  }
}

export {addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment}