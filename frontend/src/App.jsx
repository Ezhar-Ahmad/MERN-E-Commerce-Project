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
  const token = window.localStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/reset_password" element={<ResetPassword />} />

        <Route path="/" element={isLoggedIn == "true" ? <Home /> : <Login />} />
        <Route
          path="/productList"
          element={isLoggedIn == "true" ? <ProductList /> : <Login />}
        />
        <Route
          path={`/product`}
          element={isLoggedIn == "true" ? <Product /> : <Login />}
        />
        <Route
          path="/cart"
          element={isLoggedIn == "true" ? <Cart /> : <Login />}
        />

        {
          <Route
            path="/admin"
            element={isAdmin == "true" ? <Admin /> : <AdminLogin />}
          />
        }
      </Routes>
    </>
  );
};

export default App;
