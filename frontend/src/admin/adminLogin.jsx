import styled from "styled-components";
import "../../src/index.css";
import { useState } from "react";
import Input from "../components/Input";
import LoginButton from "../components/Button";
import RouteLink from "../components/RouteLink";
import { Button } from "@mui/material";
import { useEffect } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://as1.ftcdn.net/v2/jpg/04/40/12/94/1000_F_440129474_n6548Q2HGU7I808iHOwt7Kk0R8B0wf1Z.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async (e) => {
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

      await fetch("http://localhost:5000/admin/login", requestData)
        .then((response) => response.json())
        .then((res) => {
          if (res.status == "ok") {
            setEmail("");
            setPassword("");
            window.localStorage.setItem("adminToken", res.data);
            //dispatch(userLoginToken(res.data));
            window.localStorage.setItem("isAdminLoggedIn", true);
            window.location.href = "./";
          } else if (res.status == "error") {
            alert(res.error);
          } else {
            alert(res.error);
          }
        });
    } else {
      alert("Please enter email or passsword.");
    }
  };

  useEffect(() => {}, [email, password]);
  return (
    <Container>
      <Wrapper>
        <MyButton>
          <RouteLink
            to="/login"
            value={<Button variant="contained">User</Button>}
          />
        </MyButton>
        <Title>ADMIN SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton onClick={handleAdminLogin} value={"LOGIN"} />
          <RouteLink
            to="/reset_password"
            className="path-links"
            value={"DO NOT YOU REMEMBER THE PASSWORD?"}
          />
          <RouteLink
            to="/admin/register"
            className="path-links"
            value={"CREATE A NEW ACCOUNT"}
          />
        </Form>
      </Wrapper>
    </Container>
  );
};

export default AdminLogin;
