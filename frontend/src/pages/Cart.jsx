import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import RouteLink from "../components/RouteLink";
import { useSelector, useDispatch } from "react-redux";
import { cartItemsCount } from "../redux/features/counter/counterSlice";
import RemoveCart from "@mui/material/Button";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  margin-bottom: 15px;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlisttems] = useState([]);
  const [sumArray, setSumArray] = useState([]);
  const [total, setTotal] = useState(0);
  const cartsCount = useSelector((state) => state.cartItems.cartCount);
  const dispatch = useDispatch();
  const userDetail = useSelector(
    (state) => state.userLoginDetail.loginUserDetail
  );

  const getCartItems = async () => {
    await fetch(
      `http://localhost:5000/cartItem/get_cart_items/?userId=${userDetail._id}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setCartItems(res.allCartItems);
          dispatch(cartItemsCount(res.allCartItems.length));
        }
      });
  };

  const getWishlistItems = async () => {
    await fetch("http://localhost:5000/wishlist/get_wishlist")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setWishlisttems(res.allwishlistItems);
        }
      });
  };

  const getTotalAmount = () => {
    cartItems.map((item) => {
      setSumArray([...sumArray, item.price]);
    });

    console.log("sumArray1: " + sumArray);
    let subTotal = sumArray.reduce((a, b) => (a = a + b), 0);
    console.log("subTotal: " + subTotal);
    setTotal(subTotal);
    console.log("Total: " + total);
  };

  useEffect(() => {
    getCartItems();
    getWishlistItems();
    getTotalAmount();
  }, []);

  const handleRemoveCart = async (productId) => {
    await fetch(
      `http://localhost:5000/cartItem/remove_cart_item/?productId=${productId}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert("Cart removed.");
          console.log(res.removeCartItem);
        }
      });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <RouteLink
            className={"path_links"}
            to={"/productList"}
            state={{ type: "New Arrivals", cat_id: "" }}
            value={<TopButton>CONTINUE SHOPPING</TopButton>}
          />
          <TopTexts>
            <TopText>Shopping Bag({cartItems.length})</TopText>
            <TopText>Your Wishlist ({wishlistItems.length})</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cartItems.map((item) => (
              <div key={item._id}>
                <Product item={item} key={item._id}>
                  <ProductDetail>
                    <Image src={item.imageSrc} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {item.productTitle}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {item.productId}
                      </ProductId>
                      <ProductColor color={item.color} />
                      <ProductSize>
                        <b>Size:</b> {item.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{item.itemCount}</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>$ {item.price}</ProductPrice>
                    <RemoveCart
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveCart(item.productId)}
                    >
                      Remove
                    </RemoveCart>
                  </PriceDetail>
                </Product>
                <Hr />
              </div>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
