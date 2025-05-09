import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import CartItem from "../components/CartItem";
import { initialMenu } from "../data/initialMenu";
import type { ICartType } from "../utils/types";
import { getFormattedNumber } from "../utils/func";
import {
  decreaseItem,
  deleteFromCart,
  increaseItem,
} from "../slices/cartSlice";
import { mockUseAppDispatch } from "./setup";

const mockMenuData = initialMenu();
const mockFoodItem = mockMenuData[0];

const quantityOne = 1;
const cartItemOne: ICartType = { ...mockFoodItem, quantity: quantityOne };

describe("With React Testing Library", () => {
  it("Should display cart item", () => {
    renderWithProviders(<CartItem item={cartItemOne} />);
    const itemName = screen.getByText(cartItemOne.name);
    expect(itemName.textContent).toContain(mockFoodItem.name);
  });

  it("Should display correct price and quantity of item added", async () => {
    renderWithProviders(<CartItem item={cartItemOne} />);
    const itemQuantity = screen.getByText(cartItemOne.quantity);
    expect(itemQuantity.textContent).toContain(quantityOne);
    const priceElem = document.querySelectorAll(".price");
    expect(priceElem[0].textContent).toContain(mockFoodItem.price);
  });
  it("Should call increaseItem when Add button is clicked", async () => {
    renderWithProviders(<CartItem item={cartItemOne} />);
    const addButton = screen.getByRole("button", { name: /add/i });
    addButton.click();

    expect(mockUseAppDispatch).toHaveBeenCalledWith(
      increaseItem(cartItemOne.id)
    );
  });

  it("Should call decreaseItem when Remove button is clicked", async () => {
    renderWithProviders(<CartItem item={cartItemOne} />);
    const removeButton = screen.getByRole("button", { name: /remove/i });
    removeButton.click();

    expect(mockUseAppDispatch).toHaveBeenCalledWith(
      decreaseItem(cartItemOne.id)
    );
  });

  it("Should call deleteFromCart when Delete button is clicked", async () => {
    renderWithProviders(<CartItem item={cartItemOne} />);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    deleteButton.click();
    expect(mockUseAppDispatch).toHaveBeenCalledWith(
      deleteFromCart(cartItemOne.id)
    );
  });

  it("Should display the correct image for the cart item", () => {
    renderWithProviders(<CartItem item={cartItemOne} />);
    const itemImage = screen.getByAltText("cart_item_image");
    expect(itemImage.getAttribute("src")).to.equal(cartItemOne.image);
  });

  it("Should display the correct formatted price", () => {
    renderWithProviders(<CartItem item={cartItemOne} />);
    const priceElem = screen.getByText(
      getFormattedNumber(cartItemOne.price * cartItemOne.quantity)
    );
    expect(priceElem).toBeTruthy();
  });
});
