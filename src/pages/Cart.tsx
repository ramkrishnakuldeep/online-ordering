import type { ICartType } from "../utils/types";
import type { IRootState } from "../store/store";
import CartItem from "../components/CartItem";
import "../styles/Cart.scss";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { submitOrder } from "../slices/orderHistorySlice";
import { clearCart } from "../slices/cartSlice";
import { getFormattedNumber } from "../utils/func";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../hooks/appHooks";

const Cart = () => {
  const myCart: Array<ICartType> = useAppSelector((state: IRootState) => state.myCart);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);


  const cartItems = myCart.map((item) => (
    <CartItem key={item.id} item={item} />
  ));

  const getCartSubTotal = myCart.reduce(
    (acc, el) => acc + el.quantity * el.price,
    0
  );

  const handleClose = () => {
    setOpen(false);
  };

  const deliveryFee = Math.max(getCartSubTotal * (10 / 100), 40);

  const totalAmount = deliveryFee + getCartSubTotal;

  const onSubmitOrder = () => {
    dispatch(submitOrder({ items: myCart, total: totalAmount }));
    dispatch(clearCart());
    setOpen(true);
  };

  return (
    <>
      <h2 className="title"> My Cart </h2>
      <div className="cart-container">
        {cartItems}
        {myCart.length === 0 && (
          <span className="empty-container"> Your cart is empty </span>
        )}
        {myCart.length !== 0 && (
          <>
            <div className="order-summary">
              <div className="title"> Order Summary </div>
              <div className="sub-total"> <span>Subtotal :  </span> <span className="value">{getFormattedNumber(getCartSubTotal)}</span></div>
              <div className="delivery-fee"> <span> Delivery fee : </span> <span> {getFormattedNumber(deliveryFee)} </span>  </div>
              <div className="total"> <span> Total : </span><span className="value"> {getFormattedNumber(totalAmount)} </span></div>
            </div>
            <Button aria-label="submit_order" onClick={onSubmitOrder} className="submit">
              Submit
            </Button>
          </>
        )}
      </div>
      <Link  aria-label='history' className="view-history" to="/history">
        <Button> View Order History </Button>
      </Link>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        autoHideDuration={4000}
        message="Your order is successfully submitted"
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart;
