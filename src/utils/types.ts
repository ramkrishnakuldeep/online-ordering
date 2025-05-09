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

export type ICartType = IFoodItem & { quantity: number }

export type IHistoryState = Array<IOrder>

export type ICartState = Array<ICartType>