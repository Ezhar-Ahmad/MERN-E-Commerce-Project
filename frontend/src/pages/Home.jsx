import React, { useEffect, useState } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { useSelector, useDispatch } from "react-redux";
import { loggedinUserDetail } from "../redux/features/counter/counterSlice";

const Home = () => {
  const searchedItems = useSelector((state) => state.products.searchedProducts);
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  const userDetails = useSelector(
    (state) => state.userLoginDetail.loginUserDetail
  );
  const token = window.localStorage.getItem("token");
  const dispatch = useDispatch();

  const getLoggedInUserData = async () => {
    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
      }),
    };

    await fetch("http://localhost:5000/users/userData", requestData)
      .then((response) => response.json())
      .then((res) => {
        if (res.status == "ok") {
          dispatch(loggedinUserDetail(res.data));
        } else if (res.status == "error" && res.data == "token expired") {
          alert("token expired, login again.");
          window.localStorage.clear();
          window.location.href = "/login";
        } else {
          alert(res.data);
        }
      });
  };

  useEffect(() => {
    getLoggedInUserData();
  }, []);

  return (
    <div>
      <Announcement value={"Super Deal! Free Shipping on Orders Over $50"} />
      <Navbar />
      {searchedItems.length > 0 ? <Products searched={searchedItems} /> : ""}
      <Slider />
      <Announcement value={"Categories"} />
      <Categories />
      <Announcement value={"Products"} />
      <Products allProducts={true} />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
