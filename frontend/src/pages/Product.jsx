import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/features/counter/counterSlice";
import "../../src/index.css";
import { useLocation } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = ({ item }) => {
  const count = useSelector((state) => state.counter.value);
  const userDetail = useSelector(
    (state) => state.userLoginDetail.loginUserDetail
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const itemDetail = location.state;
  const productDetail = itemDetail.singleItem;
  const [size, setSize] = useState("");
  const [cartResponse, setCartResponse] = useState({});

  const handleAddToCart = async () => {
    const cartDetails = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productTitle: productDetail.title,
        productId: productDetail._id,
        price: productDetail.price,
        color: productDetail.color,
        size: size ? size : "XS",
        categoryId: productDetail.categoryId,
        itemCount: count,
        imageSrc: productDetail.imageSrc,
        userId: userDetail._id,
      }),
    };

    await fetch("http://localhost:5000/cartItem/add_to_cart", cartDetails)
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          setCartResponse(res.createdCartItem);
          alert("cart added successfully.");
        } else if (!res.success) {
          alert(res.error);
        }
      });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={productDetail.imageSrc} />
        </ImgContainer>
        <InfoContainer>
          <Title>{productDetail.title}</Title>
          <Desc>{productDetail.description}</Desc>
          <Price>$ {productDetail.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color={productDetail.color} />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                <FilterSizeOption defaultValue={"XS"}>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <button
                onClick={() => dispatch(decrement())}
                className="counter-buttons"
                disabled={count <= 1}
              >
                <Remove />
              </button>
              <Amount>{count}</Amount>
              <button
                onClick={() => dispatch(increment())}
                className="counter-buttons"
              >
                <Add />
              </button>
            </AmountContainer>
            <Button onClick={handleAddToCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
