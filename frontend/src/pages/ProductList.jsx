import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const categoryType = location.state.type;
  const categoryId = location.state.cat_id;
  const [categoryProducts, setCategoryProducts] = useState([]);
  const allProducts = useSelector((state) => state.getAllProducts.allProducts);

  const getAllNewArrivals = async () => {
    await fetch("http://localhost:5000/newArrival/get_newArrivals")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setCategoryProducts(res.allNewArrivals);
        } else if (!res.success) {
          alert(res.message);
        }
      });
  };

  const getCategoryItems = async () => {
    allProducts.map((item) => {
      if (item.categoryId == categoryId) {
        setCategoryProducts([...categoryProducts, item]);
      }
    });
  };

  useEffect(() => {
    if (categoryType == "New Arrivals") {
      getAllNewArrivals();
    } else {
      getCategoryItems();
    }
  }, [categoryType]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{categoryType}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products listType={categoryProducts} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
