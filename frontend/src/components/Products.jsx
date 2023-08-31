import styled from "styled-components";
import Product from "./Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsArray } from "../redux/features/counter/counterSlice";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = (props) => {
  const products = useSelector((state) => state.getAllProducts.allProducts);
  const dispatch = useDispatch();

  const getAllProducts = async () => {
    await fetch("http://localhost:5000/products/get_products")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          dispatch(productsArray(res.allProducts));
        }
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container>
      {props.searched &&
        props.searched.map((item) => <Product item={item} key={item._id} />)}

      {props.listType &&
        props.listType.map((item) => <Product item={item} key={item._id} />)}

      {props.allProducts &&
        products.map((item, index) =>
          index <= 12 ? <Product item={item} key={item._id} /> : ""
        )}
    </Container>
  );
};

export default Products;
