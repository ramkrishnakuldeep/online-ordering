import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ICartType, ICartState } from '../utils/types'

const initialState: ICartState = []

const cartSlice = createSlice({
    name: 'myCart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartType>) => {
            state.push(action.payload)
        },
        increaseItem: (state, action: PayloadAction<number>) => {
            for (let index = 0; index < state.length; index++) {
                if (state[index].id === action.payload) {
                    state[index].quantity += 1
                }
            }

        },
        decreaseItem: (state, action: PayloadAction<number>) => {
            for (let index = 0; index < state.length; index++) {
                if (state[index].id === action.payload) {
                    if (state[index].quantity === 1) {
                        state.splice(index, 1)
                    } else {
                        state[index].quantity -= 1
                    }
                }
            }

        },
        deleteFromCart: (state, action: PayloadAction<number>) => {
            for (let index = 0; index < state.length; index++) {
                if (state[index].id === action.payload) {
                    state.splice(index, 1)
                }
            }
        },
        clearCart:(state) => {
            state.length = 0
        }
    }
})

export const { addToCart, deleteFromCart, decreaseItem, increaseItem, clearCart } = cartSlice.actions
export default cartSlice.reducer