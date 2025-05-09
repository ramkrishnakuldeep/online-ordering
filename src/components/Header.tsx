import ShoppingCartIcon from "@mui/icons-material/ShoppingCartCheckout";
import HomeIcon from "@mui/icons-material/Home";
import "../styles/Header.scss";
import IconButton from "@mui/material/IconButton";
import { styled, Badge, badgeClasses } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import type { ICartType } from "../utils/types";
import type { IRootState } from "../store/store";
import { useAppSelector } from "../hooks/appHooks";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const Header = () => {
  const location = useLocation();
  const myCart: Array<ICartType> = useAppSelector((state: IRootState) => state.myCart);
  
  return (
    <header className="app-header">
      <span data-testid="hello-text">Hello, Mark Adam!</span>
      {location.pathname === "/" && (
        <Link aria-label='cart' to="/cart">
          <IconButton>
            <ShoppingCartIcon fontSize="small" />
            <CartBadge badgeContent={myCart.length} color="primary" overlap="circular" />
          </IconButton>
        </Link>
      )}
      {(location.pathname === "/cart" ||  location.pathname === "/history") && (
        <Link aria-label='home' to="/">
          <IconButton>
            <HomeIcon fontSize="small" />
          </IconButton>
        </Link>
      )}

    </header>
  );
};

export default Header;
