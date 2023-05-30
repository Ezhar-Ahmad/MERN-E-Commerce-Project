import styled from "styled-components";
//import Search from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchedProducts } from "../redux/features/counter/counterSlice";

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  height: 30px;
`;

const Input = styled.input`
  border: none;
  height: 25px;
`;

// const SearchButton = styled.div`
// "border": "none",
// "background-color": "white",
// "width": "20px",
// "margin-left": "1px",
// "display": "flex";
// "justify-content": "center",
// "align-items": "center",
// `;

const SearchProduct = () => {
  const [searchedKeyword, setSearchKeyword] = useState("");
  const allProducts = useSelector((state) => state.getAllProducts.allProducts);
  const searchedItems = useSelector((state) => state.products.searchedProducts);
  const dispatch = useDispatch();

  const getDataFilter = () => {
    if (searchedKeyword) {
      dispatch(
        searchedProducts(
          allProducts.filter((x) =>
            x.title.toLocaleLowerCase().includes(searchedKeyword.toLowerCase())
          )
        )
      );
    } else {
      dispatch(searchedProducts([]));
    }
  };

  useEffect(() => {
    getDataFilter();
  }, [searchedKeyword]);
  return (
    <SearchContainer>
      <Input
        placeholder="Search"
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      {/* <SearchButton>
        <Search style={{ color: "gray", fontSize: 18, marginLeft: "5px" }} />
      </SearchButton> */}
    </SearchContainer>
  );
};
export default SearchProduct;
