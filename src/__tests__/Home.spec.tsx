import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "./test-utils";

import App from "../App";
import { FoodCategory } from "../utils/enum";

describe("With React Testing Library", () => {
  it('Should show text "Menu"', () => {
    renderWithProviders(<App />);
    const text = "Menu";
    const menuText = screen.getByText(text);
    expect(menuText.textContent).toContain(text);
  });

  it("Should have 3 categories", () => {
    const { container } = renderWithProviders(<App />);
    const children = container.querySelectorAll(".category");
    expect(children.length).toBe(Object.values(FoodCategory).length);
  });

  it("Should have 1 active category", () => {
    const { container } = renderWithProviders(<App />);
    const children = container.querySelectorAll(".category.active");
    expect(children.length).toBe(1);
    expect(children[0].textContent).toContain("food");
  });

  it("Should have activate another category on click", async () => {
    const { container } = renderWithProviders(<App />);
    const children = container.querySelectorAll(".category:not(.active)");
    expect(children.length).toBe(2);
    expect(children[0].textContent).toContain("drinks");
    expect(children[1].textContent).toContain("others");

    await userEvent.click(children[0]);

    const drinksElement = container.querySelectorAll(".category.active");
    expect(drinksElement[0].textContent).toContain("drinks");

    await userEvent.click(children[1]);

    const othersCategory = container.querySelectorAll(".category.active");
    expect(othersCategory[0].textContent).toContain("others");
  });

  it("Should be able to add item to cart", async () => {
    const { container } = renderWithProviders(<App />);

    const addIcon = screen.getAllByTestId("AddCircleIcon");

    expect(addIcon.length).toBe(3);

    const badgeElemBefore = container.querySelectorAll(
      ".app-home > .app-header > a > button > .MuiBadge-root > .MuiBadge-badge"
    );
    expect(badgeElemBefore[0].textContent).toBe("");

    await userEvent.click(addIcon[1]);

    const deleteIcon = screen.getAllByTestId("DeleteIcon");
    expect(deleteIcon.length).toBe(1);

    const addIconAfter = screen.getAllByTestId("AddCircleIcon");
    expect(addIconAfter.length).toBe(2);

    const badgeElemAfter = container.querySelectorAll(
      ".app-home > .app-header > a > button > .MuiBadge-root > .MuiBadge-badge"
    );
    expect(badgeElemAfter[0].textContent).toBe("1");

    const foodItemsAfter = container.querySelectorAll(
      ".food-item > .details > .action > button"
    );
    await userEvent.click(foodItemsAfter[1]);

    const addIconAfterCart = screen.getAllByTestId("AddCircleIcon");
    expect(addIconAfterCart.length).toBe(3);
  });


});
