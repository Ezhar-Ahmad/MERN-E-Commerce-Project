import styled from "styled-components";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://as2.ftcdn.net/v2/jpg/03/75/11/01/1000_F_375110127_PB4EajIoHDGfW6LT8xAOvMAqY1CGG58W.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
//https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
//
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const NavbarDiv = styled.div`
  margin-top: 30px;
`;

const AdminRegister = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [registerResponse, setResponse] = useState("");

  const handleAdminSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmpassword) {
      const requestData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstname,
          lastName: lastname,
          userName: username,
          email: email,
          password: password,
          confirmPassword: confirmpassword,
        }),
      };

      console.log("body: " + requestData.body);
      await fetch("http://localhost:5000/admin/register", requestData)
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            setResponse(res.createdAdmin);
            alert("Admin registered successfully");
            setFirstName("");
            setLastName("");
            setUserName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            window.location.href = "./login";
          } else {
            alert(res.error);
          }
        });

      console.log("response: " + registerResponse);
    } else {
      alert("password and confirm password mismatched!");
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE ADMIN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="first name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="last name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onClick={handleAdminSignUp} value={"CREATE ACCOUNT"} />
        </Form>
      </Wrapper>
    </Container>
  );
};

export default AdminRegister;
