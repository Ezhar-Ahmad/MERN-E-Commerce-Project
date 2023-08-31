import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Table } from "@mui/material";
import Dashboard from "./Dashboard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loggedinAdminDetail } from "../redux/features/counter/counterSlice";

const Admin = () => {
  const adminDetail = useSelector(
    (state) => state.adminLoginDetail.loginAdminDetail
  );
  const token = window.localStorage.getItem("adminToken");
  const dispatch = useDispatch();

  const getLoggedInAdminData = async () => {
    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
      }),
    };

    await fetch("http://localhost:5000/admin/adminData", requestData)
      .then((response) => response.json())
      .then((res) => {
        if (res.status == "ok") {
          dispatch(loggedinAdminDetail(res.data));
        } else if (res.status == "error" && res.data == "token expired") {
          alert("token expired, login again.");
          window.localStorage.clear();
          window.location.href = "./login";
        } else {
          alert(res.error);
        }
      });
  };

  useEffect(() => {
    getLoggedInAdminData();
  }, []);
  return (
    <div>
      <Announcement />
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default Admin;
