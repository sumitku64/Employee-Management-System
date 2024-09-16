import { useEffect } from 'react';
import {useAuth} from '../context/AuthContext'
const Navbar = () => {
  const {user, logout} = useAuth()
  
    return (
      <div className="bg-teal-600 px-4 text-white flex justify-between items-center h-12">
        <h1 className="">Welcome, {user.name}</h1>
        <button className="bg-teal-800 px-4 py-1 rounded hover:bg-teal-700"
        onClick={logout}>Logout</button>
      </div>
    );
  };
  
  export default Navbar;
  