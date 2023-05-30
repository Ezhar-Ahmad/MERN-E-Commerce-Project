import styled from "styled-components";
import RouteLink from "./RouteLink";
import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import { displayCategoryItem } from "../redux/features/counter/counterSlice";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  const categoryId = useSelector((state) => state.myCategory.categoryDetails);
  const dispatch = useDispatch();

  const handleCategory = () => {
    dispatch(displayCategoryItem(item._id));
  };

  //console.log("categoryId: " + categoryId);
  return (
    <Container>
      <Image src={item.imageSrc} />
      <Info>
        <Title>{item.categoryName}</Title>
        <RouteLink
          to={`/productList`}
          className="nav-links"
          state={{ type: item.categoryName, cat_id: item._id }}
          value={<Button onClick={handleCategory}>SHOP NOW</Button>}
        />
      </Info>
    </Container>
  );
};

export default CategoryItem;
