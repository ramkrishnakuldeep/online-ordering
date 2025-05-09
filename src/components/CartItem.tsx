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
import { memo, useCallback } from "react";

interface CartItemProps {
	item: ICartType;
}

const CartItem = memo(({ item }: CartItemProps) => {
	const dispatch = useAppDispatch();

	const handleIncrease = useCallback(() => {
		dispatch(increaseItem(item.id));
	}, [dispatch, item.id]);

	const handleDecrease = useCallback(() => {
		dispatch(decreaseItem(item.id));
	}, [dispatch, item.id]);

	const handleDelete = useCallback(() => {
		dispatch(deleteFromCart(item.id));
	}, [dispatch, item.id]);

	const totalPrice = item.price * item.quantity;

	return (
		<div 
			className="cart-item"
			aria-label={`Cart item: ${item.name}`}
		>
			<div className="info">
				<img 
					src={item.image} 
					alt={`${item.name}`}
					loading="lazy"
				/>
				<div className="name-price">
					<div className="item-name">{item.name}</div>
					<div className="price">
						{getFormattedNumber(totalPrice)}
					</div>
					<div 
						className="add-remove"
						aria-label="Quantity controls"
					>
						<IconButton
							aria-label="Decrease quantity"
							onClick={handleDecrease}
						>
							<RemoveIcon />
						</IconButton>
						<span 
							className="quantity"
							aria-label={`Current quantity: ${item.quantity}`}
						>
							{item.quantity}
						</span>
						<IconButton
							aria-label="Increase quantity"
							onClick={handleIncrease}
						>
							<AddIcon />
						</IconButton>
					</div>
				</div>
			</div>
			<IconButton 
				aria-label={`Remove ${item.name} from cart`}
				onClick={handleDelete}
			>
				<DeleteIcon sx={{ fontSize: 40 }} />
			</IconButton>
		</div>
	);
});

CartItem.displayName = 'CartItem';

export default CartItem;
