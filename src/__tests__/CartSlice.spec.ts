import { describe, it, expect, beforeEach } from 'vitest'
import cartReducer, { addToCart, deleteFromCart, decreaseItem, increaseItem, clearCart } from '../slices/cartSlice'
import type { ICartState } from '../utils/types'
import { singleItem, cartDataTwoItem } from "../data/mockCart";

const mockCartItem = singleItem()

describe('cartSlice reducer', () => {
    let initialState: ICartState

    beforeEach(() => {
        initialState = []
    })

    it('should be able to add item to cart', () => {
        const state = cartReducer(initialState, addToCart(mockCartItem))
        expect(state).toEqual([mockCartItem])
    })

    it('should handle increaseItem', () => {
        const stateWithItem: ICartState = [mockCartItem]
        const state = cartReducer(stateWithItem, increaseItem(mockCartItem.id))
        expect(state[0].quantity).toBe(2)
    })

    it('should handle decreaseItem and remove item if quantity is 0', () => {
        const stateWithItem: ICartState = [mockCartItem]
        const state = cartReducer(stateWithItem, decreaseItem(mockCartItem.id))
        expect(state).toEqual([])

        const stateWithMultiple: ICartState = [{...mockCartItem, quantity: 2}]
        const updatedState = cartReducer(stateWithMultiple, decreaseItem(mockCartItem.id))
        expect(updatedState[0].quantity).toBe(1)
    })

    it('should handle deleteFromCart', () => {
        const stateWithItem: ICartState = [mockCartItem]
        const state = cartReducer(stateWithItem, deleteFromCart(mockCartItem.id))
        expect(state).toEqual([])
    })

    it('should handle clearCart', () => {
        const stateWithItems: ICartState = cartDataTwoItem()
        const state = cartReducer(stateWithItems, clearCart())
        expect(state).toEqual([])
    })
})