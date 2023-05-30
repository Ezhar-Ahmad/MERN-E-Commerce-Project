import styled from "styled-components";
//import { Link } from "react-router-dom";
import RouteLink from "../components/RouteLink";
import "../../src/index.css";
import { useState } from "react";
import Input from "../components/Input";
import LoginButton from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { userLoginToken } from "../redux/features/counter/counterSlice";
import { isLoggedInUser } from "../redux/features/counter/counterSlice";
import { useEffect } from "react";
import AdminLogin from "../admin/adminLogin";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-photo/pretty-woman-with-shopping-bags-using-smartphone_23-2148042892.jpg?w=740&t=st=1685395086~exp=1685395686~hmac=5cad82325bb73400c1dd838f1a1415724e50b6883fbae95a96aee6160bd158cb")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
//
//https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyButton = styled.div`
  display: flex;
  justify-content: end;
`;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const usertoken = useSelector((state) => state.userToken.token);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      const requestData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };

      await fetch("http://localhost:5000/users/login_user", requestData)
        .then((response) => response.json())
        .then((res) => {
          if (res.status == "Ok") {
            //alert(res.data);
            //alert("User logged in successfully.");
            setEmail("");
            setPassword("");
            window.localStorage.setItem("token", res.data);
            //set state in redux store
            //dispatch(userLoginToken(res.data));
            window.localStorage.setItem("isLoggedIn", true);
            //dispatch(isLoggedInUser(true));
            window.location.href = "./";
          } else if (res.status == "error") {
            alert(res.error);
          } else {
            alert(res.error);
          }
        });
    } else {
      alert("Please enter email or password.");
    }
  };

  useEffect(() => {}, [email, password]);
  return (
    <Container>
      <Wrapper>
        <MyButton>
          <RouteLink
            to="/admin/login"
            value={<Button variant="contained">Admin</Button>}
          />
        </MyButton>
        <Title> USER SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton onClick={handleLogin} value={"LOGIN"} />
          <RouteLink
            className=""
            to="/reset_password"
            value={"DO NOT YOU REMEMBER THE PASSWORD?"}
          />
          <RouteLink
            to="/register"
            className="path-links"
            value={"CREATE A NEW ACCOUNT"}
          />
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
