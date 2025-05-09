import type { ICartType } from "../utils/types";
import type { IRootState } from "../store/store";
import CartItem from "../components/CartItem";
import "../styles/Cart.scss";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { submitOrder } from "../slices/orderHistorySlice";
import { clearCart } from "../slices/cartSlice";
import { getFormattedNumber } from "../utils/func";
import { useState, useMemo, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../hooks/appHooks";
import { DELIVERY_FEE_PERCENTAGE, MINIMUM_DELIVERY_FEE, SNACKBAR_DURATION } from "../utils/constants";


const Cart = () => {
  const myCart: Array<ICartType> = useAppSelector((state: IRootState) => state.myCart);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  // Memoized calculations
  const cartSubTotal = useMemo(() => 
    myCart.reduce((acc, el) => acc + el.quantity * el.price, 0),
    [myCart]
  );

  const deliveryFee = useMemo(() => 
    Math.max(cartSubTotal * (DELIVERY_FEE_PERCENTAGE / 100), MINIMUM_DELIVERY_FEE),
    [cartSubTotal]
  );

  const totalAmount = useMemo(() => 
    deliveryFee + cartSubTotal,
    [deliveryFee, cartSubTotal]
  );

  // Memoized cart items
  const cartItems = useMemo(() => 
    myCart.map((item) => <CartItem key={item.id} item={item} />),
    [myCart]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmitOrder = useCallback(() => {
    dispatch(submitOrder({ items: myCart, total: totalAmount }));
    dispatch(clearCart());
    setOpen(true);
  }, [dispatch, myCart, totalAmount]);

  const renderOrderSummary = () => (
    <>
      <div className="order-summary">
        <div className="title">Order Summary</div>
        <div className="sub-total">
          <span>Subtotal:</span>
          <span className="value">{getFormattedNumber(cartSubTotal)}</span>
        </div>
        <div className="delivery-fee">
          <span>Delivery fee:</span>
          <span>{getFormattedNumber(deliveryFee)}</span>
        </div>
        <div className="total">
          <span>Total:</span>
          <span className="value">{getFormattedNumber(totalAmount)}</span>
        </div>
      </div>
      <Button 
        aria-label="submit_order" 
        onClick={onSubmitOrder} 
        className="submit"
      >
        Submit
      </Button>
    </>
  );

  return (
    <>
      <h2 className="title">My Cart</h2>
      <div className="cart-container">
        {cartItems}
        {myCart.length === 0 && (
          <span className="empty-container">Your cart is empty</span>
        )}
        {myCart.length !== 0 && renderOrderSummary()}
      </div>
      <Link aria-label="history" className="view-history" to="/history">
        <Button>View Order History</Button>
      </Link>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        autoHideDuration={SNACKBAR_DURATION}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your order is successfully submitted
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart;
