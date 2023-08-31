import "../index.css";
import {
  Add,
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import { useState } from "react";
import RouteLink from "./RouteLink";
import { useSelector } from "react-redux";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const AddToCartButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const userDetail = useSelector(
    (state) => state.userLoginDetail.loginUserDetail
  );
  const [favouriteStatus, setFavStatus] = useState("");
  const [addCartResponse, setCartResponse] = useState("");
  const [addWishlistResponse, setResponse] = useState({});

  const addToWishlist = async () => {
    if (item) {
      const itemDetails = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productTitle: item.title,
          productId: item._id,
          description: item.description,
          price: item.price,
          color: item.color,
          size: item.size,
          categoryId: item.categoryId,
          userId: userDetail._id,
          imageSrc: item.imageSrc,
        }),
      };
      await fetch("http://localhost:5000/wishlist/add_to_wishlist", itemDetails)
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            setResponse(res.addedProduct);
            alert("Added to wishlist successfully.");
          } else if (!res.success) {
            alert(res.error);
          }
        });
    } else {
      alert("cannot add item to wishlist!");
    }
  };

  const addToCart = async () => {
    if (item) {
      const itemDetails = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productTitle: item.title,
          productId: item._id,
          price: item.price,
          color: item.color,
          size: item.size,
          categoryId: item.categoryId,
          itemCount: 1,
          imageSrc: item.imageSrc,
          userId: userDetail._id,
        }),
      };
      await fetch("http://localhost:5000/cartItem/add_to_cart", itemDetails)
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            setCartResponse(res.createdCartItem);
            alert("cart added successfully.");
          } else if (!res.success) {
            alert(res.error);
          }
        });
    } else {
      alert("cannot add item to cart!");
    }
  };

  return (
    <Container>
      <Circle />
      <Image src={item.imageSrc} />
      <Info>
        <Icon title="Add to Cart" onClick={addToCart}>
          <ShoppingCartOutlined />
        </Icon>
        <RouteLink
          to={`/product`}
          className="nav-links"
          state={{ singleItem: item }}
          value={
            <Icon title="Show Product">
              <SearchOutlined />
            </Icon>
          }
        />
        <Icon title="Add to Wishlist" onClick={addToWishlist}>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
