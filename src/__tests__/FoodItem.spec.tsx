import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import FoodItem from "../components/FoodItem";
import { addToCart, deleteFromCart } from "../slices/cartSlice";
import type { IFoodItem } from "../utils/types";
import { initialMenu } from "../data/initialMenu";
import { renderWithProviders } from "./test-utils";
import { getFormattedNumber } from "../utils/func";
import { mockUseAppDispatch, mockUseAppSelector } from "./setup";


const mockMenuData = initialMenu();
const mockFoodItem: IFoodItem = mockMenuData[0];
const foodItemAdded: IFoodItem = mockMenuData[1];

mockUseAppSelector.mockImplementation((selector) => {
    const state = {
      menu: mockMenuData,
      myCart: [foodItemAdded],
    };
    return selector(state);
  });

describe("FoodItem Component", () => {

  it("renders the food item details correctly", () => {
    renderWithProviders(<FoodItem item={mockFoodItem} />);
    const foodItemImage = screen.getByAltText("food_item_image");

	expect(screen.getByText(mockFoodItem.name)).toBeTruthy();
	expect(screen.getByText(getFormattedNumber(mockFoodItem.price))).toBeTruthy();
	expect(foodItemImage.getAttribute('src')).to.equal(mockFoodItem.image);
  });

  it("renders the Add button when the item is not in the cart", () => {
	renderWithProviders(<FoodItem item={mockFoodItem} />);

	expect(screen.getByRole("button", { name: /add/i })).toBeTruthy();
  });

  it("dispatches addToCart action when Add button is clicked", () => {

	renderWithProviders(<FoodItem item={mockFoodItem} />);

	const addButton = screen.getByRole("button", { name: /add/i });
	fireEvent.click(addButton);

	expect(mockUseAppDispatch).toHaveBeenCalledWith(
	  addToCart({ ...mockFoodItem, quantity: 1 })
	);
  });

  it("renders the Delete button when the item is in the cart", () => {
	renderWithProviders(<FoodItem item={foodItemAdded} />);

	expect(screen.getByRole("button", { name: /delete/i })).toBeTruthy();
  });

  it("dispatches deleteFromCart action when Delete button is clicked", () => {
	renderWithProviders(<FoodItem item={foodItemAdded} />);

	const deleteButton = screen.getByRole("button", { name: /delete/i });
	fireEvent.click(deleteButton);

	expect(mockUseAppDispatch).toHaveBeenCalledWith(deleteFromCart(foodItemAdded.id));
  });
});