import type { CartState } from "../slices/cartSlice"
import type { MenuState } from "../slices/menuSlice"
import type { HistoryState } from "../slices/orderHistorySlice"
import type { FoodCategory } from "./enum"

export type IFoodItem = {
    id: number,
    name: string,
    category: FoodCategory,
    price: number
    image: string
}


export type IOrder = {
    orderNo: string,
    items: Array<ICartType>
    total: number
}

export type IRootState = {
    menu: MenuState,
    myCart: CartState,
    orderHistory: HistoryState
}

export type ICartType = IFoodItem & { quantity: number }