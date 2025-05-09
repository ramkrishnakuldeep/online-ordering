import { describe, it, expect, beforeEach } from 'vitest'
import orderHistoryReducer, { submitOrder, clearHistory } from '../slices/orderHistorySlice'
import type { IHistoryState, ICartType } from '../utils/types'
import { cartDataThreeItem } from "../data/mockCart";
import { orderMockHistory } from "../data/mockOrderHistory";


const mockCartData = cartDataThreeItem();
const mockOrderHistory = orderMockHistory();

const mockCartItem: ICartType = {
    id: '1',
    name: 'Pizza',
    price: 10,
    quantity: 2
}

const subTotal = mockCartData.reduce((acc, item) => acc + item.price * item.quantity, 0)

const mockOrderPayload = {
    items: mockCartData,
    total: subTotal + Math.max(subTotal * (10 / 100), 40)
}

describe('orderHistorySlice reducer', () => {
    let initialState: IHistoryState

    beforeEach(() => {
        initialState = []
    })

    it('should handle submitOrder', () => {
        const state = orderHistoryReducer(initialState, submitOrder(mockOrderPayload))
        expect(state.length).toBe(1)
        expect(state[0]).toMatchObject({
            items: mockOrderPayload.items,
            total: mockOrderPayload.total
        })
        expect(state[0].orderNo).toBeDefined()
    })

    it('should handle clearHistory', () => {
        const stateWithOrders: IHistoryState = mockOrderHistory
        const state = orderHistoryReducer(stateWithOrders, clearHistory())
        expect(state).toEqual([])
    })
})