import ShoppingCartIcon from "@mui/icons-material/ShoppingCartCheckout";
import HomeIcon from "@mui/icons-material/Home";
import "../styles/Header.scss";
import IconButton from "@mui/material/IconButton";
import { styled, Badge, badgeClasses } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import type { ICartType } from "../utils/types";
import type { IRootState } from "../store/store";
import { useAppSelector } from "../hooks/appHooks";
import { memo, useMemo } from "react";
import { ROUTES } from "../utils/constants";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const Header = memo(() => {
  const location = useLocation();
  const myCart: Array<ICartType> = useAppSelector((state: IRootState) => state.myCart);
  
  const isHomePage = useMemo(() => location.pathname === ROUTES.HOME, [location.pathname]);
  const isCartOrHistoryPage = useMemo(() => 
    location.pathname === ROUTES.CART || location.pathname === ROUTES.HISTORY,
    [location.pathname]
  );

  return (
    <header className="app-header">
      <span data-testid="hello-text">Hello, Mark Adam!</span>
      
      {isHomePage && (
        <Link to={ROUTES.CART} aria-label="View shopping cart">
          <IconButton aria-label="Shopping cart">
            <ShoppingCartIcon fontSize="small" />
            <CartBadge 
              badgeContent={myCart.length} 
              color="primary" 
              overlap="circular"
              aria-label={`${myCart.length} items in cart`}
            />
          </IconButton>
        </Link>
      )}

      {isCartOrHistoryPage && (
        <Link to={ROUTES.HOME} aria-label="Return to home page">
          <IconButton aria-label="Home">
            <HomeIcon fontSize="small" />
          </IconButton>
        </Link>
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
