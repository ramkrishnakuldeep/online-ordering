import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./test-utils";
import { FoodCategory } from "../utils/enum";
import Home from "../pages/Home";
import { mockUseAppSelector } from "./setup";
import { initialMenu } from "../data/initialMenu";

const mockMenuData = initialMenu();

mockUseAppSelector.mockImplementation((selector) => {
  const state = {
    menu: mockMenuData,
    myCart: [],
  };
  return selector(state);
});

describe("With React Testing Library", () => {

  beforeEach(() => {
    renderWithProviders(<Home />);
  });
  
  it('Should show text "Menu"', () => {
    const menuText = screen.getByRole("heading", { name: /menu/i, level: 2 });
    expect(menuText.textContent).toContain("Menu");
  });

  it("renders all categories", () => {
    const categoryElements = document.querySelectorAll(".category");
    expect(categoryElements.length).toBe(Object.values(FoodCategory).length);
  });

  it("sets the correct initial active category", () => {
    const activeCategory = screen.getByRole("button", { name: FoodCategory.FOOD });
    expect(activeCategory.classList.contains("active")).toBeTruthy();
  });

  it("updates the active category on click", async () => {
    const drinkCategory = screen.getByRole("button", { name: FoodCategory.DRINKS });
    await userEvent.click(drinkCategory);

    expect(drinkCategory.classList.contains("active")).toBeTruthy();
    const foodCategory = screen.getByRole("button", { name: FoodCategory.FOOD });
    expect(foodCategory.classList.contains("active")).toBeFalsy();
  });

  it("filters menu items based on the selected category", async () => {
    const drinkCategory = screen.getByRole("button", { name: FoodCategory.DRINKS });
    await userEvent.click(drinkCategory);

    const menuItems = document.querySelectorAll(".food-item");
    expect(menuItems.length).toBe(3);
    const drinksMenu = mockMenuData.filter((item) => item.category === FoodCategory.DRINKS)
    expect(menuItems[0].textContent).toContain(drinksMenu[0].name);
  });
});
