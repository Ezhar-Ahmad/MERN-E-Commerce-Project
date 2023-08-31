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
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  margin: 10px 5px;
`;

const NavbarDiv = styled.div`
  margin-top: 30px;
`;

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [respns, setResponse] = useState("");

  const handleSignUp = async (e) => {
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

      await fetch("http://localhost:5000/users/create_user", requestData)
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            setResponse(res.createdUser);
            setFirstName("");
            setLastName("");
            setUserName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            window.location.href = "./login";
          } else {
            alert(res.Error);
          }
        });

      console.log("response: " + respns);
    } else {
      alert("password and confirm password mismatched!");
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
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
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSignUp} value={"CREATE"} />
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
