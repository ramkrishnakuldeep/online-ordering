import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "./test-utils";

import App from "../App";
import userEvent from "@testing-library/user-event";
import { mockUseAppSelector } from "./setup";
import { initialMenu } from "../data/initialMenu";

const mockMenuData = initialMenu();

mockUseAppSelector.mockImplementation((selector) => {
  const state = {
    menu: mockMenuData,
    myCart: [],
    orderHistory: [],
  };
  return selector(state);
});

describe("With React Testing Library", () => {
  beforeEach(() => {
    renderWithProviders(<App />);
  });

  it('Shows "Hello, Mark Adam!"', () => {
    const text = "Hello, Mark Adam!";
    const helloText = screen.getByTestId("hello-text");
    expect(helloText.textContent).toEqual(text);
    const pageTitle = document.querySelectorAll(".home-main > h2.title");
    expect(pageTitle[0].textContent).toContain("Menu");
  });

  it("should navigate to the cart page when the cart link is clicked", async () => {
    const cartLink = screen.getByRole("link", { name: /cart/i });
    await userEvent.click(cartLink);

    const cartHeading = screen.getByRole("heading", { name: /my cart/i });
    expect(cartHeading).toBeTruthy();
  });

  it("should navigate to the history page when the history link is clicked", async () => {
    const cartLink = screen.getByRole("link", { name: /cart/i });
    await userEvent.click(cartLink);

    const historyLink = screen.getByRole("link", { name: /history/i });
    await userEvent.click(historyLink);

    const cartHeading = screen.getByRole("heading", { name: /order history/i });
    expect(cartHeading).toBeTruthy();
  });
});
