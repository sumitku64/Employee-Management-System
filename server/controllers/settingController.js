import User from "../models/User.js";
import bcrypt from 'bcrypt'

const changePassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById({_id: userId})

    if(!user) {
    return res.status(404).json({ success:false, error: 'user not found '});
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if(!isMatch) {
      return res.status(404).json({ success:false, error: 'wrong old password'});
    }

    const hashPassword = await bcrypt.hash(newPassword, 10)

    const updateUser = await User.findByIdAndUpdate({_id: userId}, {password: hashPassword})

    return res.status(201).json({success:true, user: updateUser});
  } catch (error) {
    console.error('Error changing password:', error.message);
    return res.status(500).json({ success:false, error: 'Server error'});
  }
};


export {changePassword}