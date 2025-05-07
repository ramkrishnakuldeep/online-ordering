import DeleteIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";
import type { ICartType } from "../utils/types";
import { useDispatch } from "react-redux";
import { getFormattedNumber } from "../utils/func";
import {
  increaseItem,
  decreaseItem,
  deleteFromCart,
} from "../slices/cartSlice";

const CartItem = (props: { item: ICartType }) => {
  const dispatch = useDispatch();
  return (
    <div className="cart-item">
      <div className="info">
        <img src={props.item.image} alt="" />
        <div className="name-price">
          <div> {props.item.name} </div>
          <div> {getFormattedNumber(props.item.price)} </div>
          <div className="add-remove">
            <span
              className="remove"
              onClick={() => dispatch(decreaseItem(props.item.id))}
            >
              <IconButton>
                <RemoveIcon />
              </IconButton>
            </span>
            <span>{props.item.quantity}</span>
            <span
              className="add"
              onClick={() => dispatch(increaseItem(props.item.id))}
            >
              <IconButton>
                <AddIcon />
              </IconButton>
            </span>
          </div>
        </div>
      </div>
      <IconButton onClick={() => dispatch(deleteFromCart(props.item.id))}>
        <DeleteIcon sx={{ fontSize: 40 }} />
      </IconButton>
    </div>
  );
};

export default CartItem;
