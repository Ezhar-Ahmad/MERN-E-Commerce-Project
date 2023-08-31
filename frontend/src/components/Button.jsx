import MyButton from "@mui/material/Button";

const Button = (props) => {
  return (
    <MyButton variant="contained" color="success" onClick={props.onClick}>
      {props.value}
    </MyButton>
  );
};
export default Button;
