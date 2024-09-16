import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // useEffect(() => {
  //   if (!loading) {
  //     if (user) {
  //       if (user.role === "admin") {
  //         navigate("/admin-dashboard");
  //       } else if (user.role === "employee") {
  //         navigate("/employee-dashboard");
  //       }
  //     } else {
  //       navigate("/login");
  //     }
  //   }
  // }, [user, navigate, loading]);

  return <>{loading ? <p>Loading ...</p> : <div> home </div>}</>;
};

export default Home;
