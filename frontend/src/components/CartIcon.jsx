import RouteLink from "./RouteLink";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const addToCartCount = useSelector((state) => state.cartItems.cartCount);
  return (
    <RouteLink
      className="nav-links"
      to="/cart"
      value={
        <Badge badgeContent={addToCartCount} color="primary">
          <ShoppingCartOutlined />
        </Badge>
      }
    />
  );
};
export default CartIcon;
