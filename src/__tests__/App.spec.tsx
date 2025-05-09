import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";

import { renderWithProviders } from "./test-utils";

import App from "../App";
import userEvent from "@testing-library/user-event";
import { getFormattedNumber } from "../utils/func";

describe("With React Testing Library", () => {
  it('Shows "Hello, Mark Adam!"', () => {
    renderWithProviders(<App />);
    const text = "Hello, Mark Adam!";
    const helloText = screen.getByTestId("hello-text");
    expect(helloText.textContent).toEqual(text);
    const pageTitle = document.querySelectorAll(".home-main > h2.title");
    expect(pageTitle[0].textContent).toContain("Menu");
  });

  it("Should be able to delete item from the cart", async () => {
    const { container } = renderWithProviders(<App />);


    const cartContainer = ".home-main > .cart-container";
    const cartItemSelector = `${cartContainer}  > .cart-item`;
    const anchorSelector = `.app-home > .app-header > a`;
    const cartAnchorBefore = container.querySelectorAll(anchorSelector);
    // const linkElement = scsreen.getByRole('link');

    // linkElement.addEventListener("click", (event) => {
    //   event.preventDefault();
    // });

    const addIcon = screen.getAllByTestId("AddCircleIcon");
    await userEvent.click(addIcon[1]);
    await userEvent.click(addIcon[0]);

    // const cartAnchor = container.querySelectorAll(anchorSelector);
    // await userEvent.click(cartAnchor[0]);

    fireEvent.click(cartAnchorBefore[0]);

    const cartItems = document.querySelectorAll(cartItemSelector);
    expect(cartItems.length).toBe(2);

    const removeIcon = screen.getAllByTestId("RemoveCircleIcon");
    await userEvent.click(removeIcon[0]);

    const cartItemsRemoved = document.querySelectorAll(cartItemSelector);
    expect(cartItemsRemoved.length).toBe(1);

    const deleteIcon = screen.getAllByTestId("DeleteForeverIcon");
    await userEvent.click(deleteIcon[0]);

    const cartItemsDeleted = document.querySelectorAll(cartItemSelector);
    expect(cartItemsDeleted.length).toBe(0);
  });

  it("Should be able to navigate to cart and submit order", async () => {
    const { container } = renderWithProviders(<App />);
    const addIcon = screen.getAllByTestId("AddCircleIcon");
    await userEvent.click(addIcon[1]);

    const cartContainer = ".home-main > .cart-container";
    const historyContainer = ".home-main > .history-container";
    const cartItemSelector = `${cartContainer}  > .cart-item`;
    const cartItemPriceSel = `${cartItemSelector}  > .info > .name-price > .price`;
    const cartItemAddSel = `${cartItemSelector}  > .info > .name-price > .add-remove > .add > button`;
    const cartItemRemoveSel = `${cartItemSelector}  > .info > .name-price > .add-remove > .remove > button`;
    const historyItemSelector = `${historyContainer}  > .history-item`;
    const deleteHistorySelector = `.home-main > .delete-history`;
    const submitBtnSelector = `${cartContainer}  > button.submit`;
    const anchorSelector = `.app-home > .app-header > a`;
    const historySelector = `.home-main > .view-history`;
    const titleSelector = `.home-main > h2.title`;

    const cartAnchor = container.querySelectorAll(anchorSelector);

    fireEvent.click(cartAnchor[0]);

    const cartItems = document.querySelectorAll(cartItemSelector);
    expect(cartItems.length).toBe(1);

    const submitButton = document.querySelectorAll(submitBtnSelector);

    expect(submitButton.length).toBe(1);

    const priceElem = container.querySelectorAll(cartItemPriceSel);
    const itemPrice = priceElem[0].textContent || ''
    const price = parseFloat(itemPrice.replace(/,/g, ""));

    const addButtonIcon = document.querySelectorAll(cartItemAddSel);
    await userEvent.click(addButtonIcon[0]);

    const priceElemAfter = document.querySelectorAll(cartItemPriceSel);
    expect(priceElemAfter[0].textContent).toContain(
      getFormattedNumber(price * 2)
    );

    await userEvent.click(addButtonIcon[0]);

    const priceElem2 = document.querySelectorAll(cartItemPriceSel);
    expect(priceElem2[0].textContent).toContain(getFormattedNumber(price * 3));

    const removeButtonIcon = document.querySelectorAll(cartItemRemoveSel);
    await userEvent.click(removeButtonIcon[0]);

    const priceElemRemove = document.querySelectorAll(cartItemPriceSel);
    expect(priceElemRemove[0].textContent).toContain(
      getFormattedNumber(price * 2)
    );

    await userEvent.click(submitButton[0]);

    const cartItemsAfter = document.querySelectorAll(cartItemSelector);
    expect(cartItemsAfter.length).toBe(0);

    const historyAnchor = container.querySelectorAll(historySelector);

    await userEvent.click(historyAnchor[0]);

    const historyTitle = container.querySelectorAll(titleSelector);

    expect(historyTitle[0].textContent).toContain("Order History");

    const historyItems = container.querySelectorAll(historyItemSelector);

    expect(historyItems.length).toBe(1);

    const deleteHistoryBtn = container.querySelectorAll(deleteHistorySelector);

    await userEvent.click(deleteHistoryBtn[0]);

    const historyItemsAfter = container.querySelectorAll(historyItemSelector);

    expect(historyItemsAfter.length).toBe(0);
  });
});
