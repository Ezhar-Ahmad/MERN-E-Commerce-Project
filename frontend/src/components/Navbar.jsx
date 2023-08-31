import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styled from "styled-components";
import RouteLink from "./RouteLink";
import "../../src/index.css";
import SearchProduct from "./SearchProduct";
import CartIcon from "./CartIcon";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = () => {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const isAdmin = window.localStorage.getItem("isAdminLoggedIn");

  const [cardStatus, setCardStatus] = useState(false);
  const userDetails = useSelector(
    (state) => state.userLoginDetail.loginUserDetail
  );

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };
  useEffect(() => {}, [isLoggedIn, isAdmin]);

  const handleCard = () => {
    setCardStatus((current) => !current);
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          {isLoggedIn == "true" ? <SearchProduct /> : ""}
        </Left>
        <Center>
          <Logo>
            {isLoggedIn == "true" ? (
              <RouteLink className="nav-links" to="/" value={"WardrobeWhiz"} />
            ) : (
              "WardrobeWhiz"
            )}
          </Logo>
        </Center>
        <Right>
          {isAdmin == "true" || isLoggedIn == "true" ? (
            <MenuItem>
              <Button variant="text" onClick={handleLogout}>
                SIGN OUT
              </Button>
            </MenuItem>
          ) : (
            ""
          )}

          <MenuItem>{isLoggedIn == "true" ? <CartIcon /> : ""}</MenuItem>
          {/* {cardStatus && <BasicCard />} */}
          <MenuItem>
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleCard}
            >
              <AccountCircleIcon
                titleAccess={userDetails.userName + " | " + userDetails.email}
              />
            </button>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
