import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IHistoryState, IOrder, ISubmitOrderPayload } from '../utils/types'
import { generateOrderNumber } from '../utils/func'


const SLICE_NAME = 'orderHistory' as const

const initialState: IHistoryState = []

const createOrder = (payload: ISubmitOrderPayload): IOrder => ({
    orderNo: generateOrderNumber(),
    items: payload.items,
    total: payload.total
})

const orderHistorySlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        submitOrder: (state, action: PayloadAction<ISubmitOrderPayload>) => {
            const newOrder = createOrder(action.payload)
            state.push(newOrder)
        },
        clearHistory: (state) => {
            state.length = 0
        }
    }
})

// Exports
export const { submitOrder, clearHistory } = orderHistorySlice.actions
export default orderHistorySlice.reducer