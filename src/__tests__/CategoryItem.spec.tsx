import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CategoryItem from "../components/CategoryItem";
import { FoodCategory } from "../utils/enum";

describe("CategoryItem Component", () => {
  it("Should render the category name", () => {
    render(
      <CategoryItem
        category={FoodCategory.FOOD}
        current={FoodCategory.FOOD}
        onClickAction={() => {}}
      />
    );

    const categoryElement = screen.getByText(FoodCategory.FOOD);
    expect(categoryElement).toBeTruthy();
  });

  it("Should have 'active' class when current category matches", () => {
    render(
      <CategoryItem
        category={FoodCategory.FOOD}
        current={FoodCategory.FOOD}
        onClickAction={() => {}}
      />
    );
  
    const categoryElement = screen.getByText(FoodCategory.FOOD);
    expect(categoryElement.classList.contains("active")).toBeTruthy();
  });
  
  it("Should not have 'active' class when current category does not match", () => {
    render(
      <CategoryItem
        category={FoodCategory.DRINKS}
        current={FoodCategory.FOOD}
        onClickAction={() => {}}
      />
    );
  
    const categoryElement = screen.getByText(FoodCategory.DRINKS);
    expect(categoryElement.classList.contains("active")).toBeFalsy();
  });

  it("Should call onClickAction with the correct category when clicked", async () => {
    const mockOnClickAction = vi.fn();

    render(
      <CategoryItem
        category={FoodCategory.OTHERS}
        current={FoodCategory.FOOD}
        onClickAction={mockOnClickAction}
      />
    );

    const categoryElement = screen.getByText(FoodCategory.OTHERS);
    await userEvent.click(categoryElement);

    expect(mockOnClickAction).toHaveBeenCalledTimes(1);
    expect(mockOnClickAction).toHaveBeenCalledWith(FoodCategory.OTHERS);
  });
});