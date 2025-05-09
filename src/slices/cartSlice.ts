import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ICartType, ICartState } from '../utils/types'

const SLICE_NAME = 'myCart' as const

const initialState: ICartState = []

const findItemIndex = (state: ICartState, itemId: number): number => {
    return state.findIndex(item => item.id === itemId)
}

const updateItemQuantity = (
    state: ICartState,
    itemId: number,
    updateFn: (quantity: number) => number
): void => {
    const index = findItemIndex(state, itemId)
    if (index !== -1) {
        state[index].quantity = updateFn(state[index].quantity)
    }
}

const cartSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartType>) => {
            state.push(action.payload)
        },
        increaseItem: (state, action: PayloadAction<number>) => {
            updateItemQuantity(state, action.payload, quantity => quantity + 1)
        },
        decreaseItem: (state, action: PayloadAction<number>) => {
            const index = findItemIndex(state, action.payload)

            if (index !== -1) {
                if (state[index].quantity === 1) {
                    // Remove item if quantity would become 0
                    state.splice(index, 1)
                } else {
                    // Decrease quantity
                    state[index].quantity -= 1
                }
            }
        },
        deleteFromCart: (state, action: PayloadAction<number>) => {

            const index = findItemIndex(state, action.payload)
            if (index !== -1) {
                state.splice(index, 1)
            }
        },
        clearCart: (state) => {
            state.length = 0
        }
    }
})

// Exports
export const { addToCart, deleteFromCart, decreaseItem, increaseItem, clearCart } = cartSlice.actions
export default cartSlice.reducer