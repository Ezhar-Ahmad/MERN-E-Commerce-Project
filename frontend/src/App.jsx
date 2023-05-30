import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Admin from "./admin/admin";
import AdminRegister from "./admin/adminRegister";
import AdminLogin from "./admin/adminLogin";
import ResetPassword from "./pages/ResetPassword";
import { useSelector } from "react-redux";

const App = () => {
  //const isLoggedIn = useSelector((state) => state.isUserLoggedIn.isLoggedIn);
  //const isAdmin = useSelector((state) => state.isAdminLoggedIn.isAdmin);
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const isAdmin = window.localStorage.getItem("isAdminLoggedIn");
  console.log(isLoggedIn);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        {isLoggedIn && isAdmin && <Route path="/admin" element={<Admin />} />}

        {isLoggedIn && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/productList" element={<ProductList />} />
            <Route path={`/product`} element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </>
        )}

        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
      </Routes>
    </>
  );
};

export default App;
