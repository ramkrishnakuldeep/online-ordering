import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ICartType, IOrder } from '../utils/types'


export type HistoryState = Array<IOrder>

const initialState: HistoryState = []


const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState: initialState,
    reducers: {
        submitOrder: (state, action: PayloadAction<{ items: Array<ICartType>, total: number }>) => {
            console.log('action.payload ', action.payload);
            state.push({ orderNo: new Date().getTime().toString(), items: action.payload.items, total: action.payload.total })
        },
        clearHistory:(state) => {
            state.length = 0
        }
    }
})

export const { submitOrder, clearHistory } = orderHistorySlice.actions
export default orderHistorySlice.reducer