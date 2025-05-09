import IconButton from "@mui/material/IconButton";
import type { ICartType, IFoodItem } from "../utils/types";
import AddIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/FoodItem.scss";
import { getFormattedNumber } from "../utils/func";
import { addToCart, deleteFromCart } from "../slices/cartSlice";
import type { IRootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../hooks/appHooks";

const FoodItem = (props: { item: IFoodItem }) => {
  const dispatch = useAppDispatch();
  const myCart: Array<ICartType> = useAppSelector((state: IRootState) => state.myCart);
  const isItemInCart = myCart.filter((item) => item.id === props.item.id).length !== 0;

  return (
    <div className="food-item" aria-label="food-item">
      <img src={props.item.image} alt="food_item_image" />
      <div className="details">
        <div className="info">
          <span className="name"> {props.item.name} </span>
          <span className="price">
            {getFormattedNumber(props.item.price)}
          </span>
        </div>
        <div className="action">
          {isItemInCart && (
            <IconButton aria-label="delete"
              onClick={() =>
                dispatch(deleteFromCart(props.item.id))
              }
            >
              <DeleteIcon sx={{ fontSize: 40 }} />
            </IconButton>
          )}
          {!isItemInCart && (
            <IconButton aria-label="add"
              onClick={() =>
                dispatch(addToCart({ ...props.item, quantity: 1 }))
              }
            >
              <AddIcon sx={{ fontSize: 40 }} />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
