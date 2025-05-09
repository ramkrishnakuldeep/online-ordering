import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders, resetMockStore } from "./test-utils";
import History from "../pages/History";
import { mockUseAppSelector, mockUseAppDispatch } from "./setup";
import { clearHistory } from "../slices/orderHistorySlice";
import { orderMockHistory } from "../data/mockOrderHistory";

const mockHistoryData = orderMockHistory();

describe("History Component", () => {
  beforeEach(() => {
    mockUseAppSelector.mockImplementation((selector) => {
      const state = {
        menu: [],
        myCart: [],
        orderHistory: mockHistoryData,
      };
      return selector(state);
    });
  });

  afterEach(() => {
    resetMockStore(); // Reset the mock store after each test
  });

  it('should display the "Order History" heading', () => {
    renderWithProviders(<History />);

    const heading = screen.getByRole("heading", { name: /order history/i });
    expect(heading).toBeTruthy();
  });

  it("should render all order history items", () => {
    const { container } = renderWithProviders(<History />);
    screen.debug();
    const historyItems = container.querySelectorAll(".history-item");
    expect(historyItems.length).toBe(mockHistoryData.length);
  });

  it('should display "Delete History" button when there is order history', () => {
    renderWithProviders(<History />);

    const deleteButton = screen.getByRole("button", {
      name: /delete history/i,
    });
    expect(deleteButton).toBeTruthy();
  });

  it("should display empty message when there is no order history", () => {
    mockUseAppSelector.mockImplementation((selector) => {
      const state = {
        menu: [],
        myCart: [],
        orderHistory: [],
      };
      return selector(state);
    });

    renderWithProviders(<History />);

    const emptyMessage = screen.getByText(
      /you don't have any order history yet/i
    );
    expect(emptyMessage).toBeTruthy();
  });

  it("should dispatch clearHistory action when 'Delete History' button is clicked", async () => {
    renderWithProviders(<History />);

    const deleteButton = screen.getByRole("button", {
      name: /delete history/i,
    });
    await userEvent.click(deleteButton);

    expect(mockUseAppDispatch).toHaveBeenCalledWith(clearHistory());
  });
});
