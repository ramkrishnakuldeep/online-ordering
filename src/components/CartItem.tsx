import DeleteIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";
import type { ICartType } from "../utils/types";
import { useAppDispatch } from "../hooks/appHooks";
import { getFormattedNumber } from "../utils/func";
import {
	increaseItem,
	decreaseItem,
	deleteFromCart,
} from "../slices/cartSlice";

const CartItem = (props: { item: ICartType }) => {
	const dispatch = useAppDispatch();
	return (
		<div className="cart-item" aria-label="cart-item">
			<div className="info">
				<img src={props.item.image} alt="cart_item_image" />
				<div className="name-price">
					<div className="item-name"> {props.item.name} </div>
					<div className="price">
						{getFormattedNumber(props.item.price * props.item.quantity)}
					</div>
					<div className="add-remove">
						<span
							className="remove"
							onClick={() => dispatch(decreaseItem(props.item.id))}
						>
							<IconButton aria-label="remove">
								<RemoveIcon />
							</IconButton>
						</span>
						<span className="quantity">{props.item.quantity}</span>
						<span
							className="add"
							onClick={() => dispatch(increaseItem(props.item.id))}
						>
							<IconButton aria-label="add">
								<AddIcon />
							</IconButton>
						</span>
					</div>
				</div>
			</div>
			<IconButton aria-label="delete" onClick={() => dispatch(deleteFromCart(props.item.id))}>
				<DeleteIcon sx={{ fontSize: 40 }} />
			</IconButton>
		</div>
	);
};

export default CartItem;
