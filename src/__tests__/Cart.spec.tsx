// File: Cart.test.tsx
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mockUseAppDispatch, mockUseAppSelector } from "./setup";
import { submitOrder } from "../slices/orderHistorySlice";

import { screen } from "@testing-library/react";
import { cartDataOneItem, cartDataThreeItem } from "../data/mockCart";

import Cart from "../pages/Cart";
import { renderWithProviders, resetMockStore } from "./test-utils";
import { getFormattedNumber } from "../utils/func";
import userEvent from "@testing-library/user-event";

describe("Cart Component - getCartSubTotal", () => {
  beforeEach(() => {
    mockUseAppSelector.mockImplementation((selector) => {
      const state = { myCart: [] };
      return selector(state);
    });
  });

  afterEach(() => {
    resetMockStore(); // Reset the mock store after each test
  });

  it('should display the "My cart" heading', () => {
    renderWithProviders(<Cart />);

    const heading = screen.getByRole("heading", { name: /my cart/i });
    expect(heading).toBeTruthy();
  });

  it("should return 0 for an empty cart", () => {
    renderWithProviders(<Cart />);

    const emptyMessage = screen.getByText(/your cart is empty/i);
    expect(emptyMessage).toBeTruthy();
  });

  it("should calculate subtotal for a cart with one item", () => {
    mockUseAppSelector.mockImplementation((selector) =>  selector({myCart: cartDataOneItem()}));

    const { container } = renderWithProviders(<Cart />);
    const subTotalElement = container.querySelector(".sub-total > .value");
    const subTotal = cartDataOneItem().reduce((acc, item) => acc + item.price,0)
    expect(subTotalElement?.textContent).toBe(getFormattedNumber(subTotal));
  });

  it("should calculate subtotal for a cart with multiple items", () => {
    mockUseAppSelector.mockImplementation((selector) =>  selector({myCart: cartDataThreeItem()}));

    const { container } = renderWithProviders(<Cart />);
    const subTotalElement = container.querySelector(".sub-total > .value");
    const subTotal = cartDataThreeItem().reduce((acc, item) => acc + item.price,0)
    expect(subTotalElement?.textContent).toBe(getFormattedNumber(subTotal));
  });

  it("should dispatch submitOrder action when 'Submit Order' button is clicked", async () => {  
    const myCart = cartDataThreeItem();
    mockUseAppSelector.mockImplementation((selector) => selector({ myCart }));
  
    renderWithProviders(<Cart />);
  
    const submitButton = screen.getByRole("button", { name: /submit_order/i });
    await userEvent.click(submitButton);
    const subTotal = cartDataThreeItem().reduce((acc, item) => acc + item.price,0)
    const total = subTotal +  Math.max(subTotal * (10 / 100), 40);
    expect(mockUseAppDispatch).toHaveBeenCalledWith(submitOrder({ items: myCart, total }));
  });

});
