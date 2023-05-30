import styled from "styled-components";

const CustomInput = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 5px;
  padding: 10px;
`;

const Input = (props) => {
  return (
    <CustomInput
      placeholder={props.placeholder}
      onChange={props.onChange}
      style={props.style}
      required
    ></CustomInput>
  );
};
export default Input;
