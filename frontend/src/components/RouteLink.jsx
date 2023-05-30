import { Link } from "react-router-dom";
import "../../src/index.css";

const RouteLink = (props) => {
  return (
    <Link
      className={props.className}
      to={props.to}
      state={props.state}
      style={{ marginTop: "5px" }}
    >
      {props.value}
    </Link>
  );
};
export default RouteLink;
