import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import newRequest from "../utils/newRequest";

const UserLayout = () => {
  const checkUser = async () => {
    try {
      const res = await newRequest.get("/users");
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      // navigate('/');
    } catch (error) {
      localStorage.setItem("currentUser", null);
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayout;
