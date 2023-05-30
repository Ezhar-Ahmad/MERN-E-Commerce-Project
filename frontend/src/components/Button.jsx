import styled from "styled-components";
import MyButton from "@mui/material/Button";

// const CustomButton = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color: teal;
//   color: white;
//   cursor: pointer;
//   margin: 10px 5px;
// `;
const Button = (props) => {
  //return <CustomButton onClick={props.onClick}>{props.value}</CustomButton>;
  return (
    <MyButton variant="contained" color="success" onClick={props.onClick}>
      {props.value}
    </MyButton>
  );
};
export default Button;
