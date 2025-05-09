import IconButton from "@mui/material/IconButton";
import type { ICartType, IFoodItem } from "../utils/types";
import AddIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/FoodItem.scss";
import { getFormattedNumber } from "../utils/func";
import { addToCart, deleteFromCart } from "../slices/cartSlice";
import type { IRootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../hooks/appHooks";
import { memo, useCallback, useMemo } from "react";

interface FoodItemProps {
  item: IFoodItem;
}

const FoodItem = memo(({ item }: FoodItemProps) => {
  const dispatch = useAppDispatch();
  const myCart: Array<ICartType> = useAppSelector((state: IRootState) => state.myCart);
  
  const isItemInCart = useMemo(() => 
    myCart.some((cartItem) => cartItem.id === item.id),
    [myCart, item.id]
  );

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  }, [dispatch, item]);

  const handleDeleteFromCart = useCallback(() => {
    dispatch(deleteFromCart(item.id));
  }, [dispatch, item.id]);

  return (
    <div className="food-item" aria-label="food-item">
      <img src={item.image} alt="food_item_image" loading="lazy" />
      <div className="details">
        <div className="info">
          <span className="name">{item.name}</span>
          <span className="price">
            {getFormattedNumber(item.price)}
          </span>
        </div>
        <div className="action">
          {isItemInCart ? (
            <IconButton 
              aria-label="delete"
              onClick={handleDeleteFromCart}
            >
              <DeleteIcon sx={{ fontSize: 40 }} />
            </IconButton>
          ) : (
            <IconButton 
              aria-label="add"
              onClick={handleAddToCart}
            >
              <AddIcon sx={{ fontSize: 40 }} />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
});

FoodItem.displayName = 'FoodItem';

export default FoodItem;
