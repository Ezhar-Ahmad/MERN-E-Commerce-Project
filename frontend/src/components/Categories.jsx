import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { useState, useEffect } from "react";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    await fetch("http://localhost:5000/category/get_categories")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setCategories(res.allCategories);
        }
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Container>
        {categories.map((item, index) =>
          index <= 2 ? <CategoryItem item={item} key={item._id} /> : ""
        )}
      </Container>
      <Container>
        {categories.map((item, index) =>
          index >= 3 && index <= 5 ? (
            <CategoryItem item={item} key={item.id} />
          ) : (
            ""
          )
        )}
      </Container>
      <Container>
        {categories.map((item, index) =>
          index >= 6 && index <= 8 ? (
            <CategoryItem item={item} key={item.id} />
          ) : (
            ""
          )
        )}
      </Container>
    </>
  );
};

export default Categories;
