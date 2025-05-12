import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { getFormattedNumber } from "../utils/func";
import HistoryItem from "../components/HistoryItem";
import { renderWithProviders } from "./test-utils";
import { orderMockHistory } from "../data/mockOrderHistory";

const mockHistoryData = orderMockHistory();
const oneMockOrder = mockHistoryData[0];

describe("HistoryItem Component", () => {
  it("displays the correct order number", () => {
    renderWithProviders(<HistoryItem item={oneMockOrder} />);
    const orderNumber = screen.getByText(`Order #${oneMockOrder.orderNo}`);
    expect(orderNumber).toBeTruthy();
  });

  it("renders all order items with correct details", () => {
    const { container } = renderWithProviders(<HistoryItem item={oneMockOrder} />);

	const items = container.querySelectorAll(".items > .order-item");
	expect(items.length).toBe(oneMockOrder.items.length);
    
  });

  it("displays the correct total amount", () => {
    renderWithProviders(<HistoryItem item={oneMockOrder} />);
    const totalAmount = screen.getByText(`Total: ${getFormattedNumber(oneMockOrder.total)}`);
    expect(totalAmount).toBeTruthy();
  });

  it("sets the correct aria-label for accessibility", () => {
    renderWithProviders(<HistoryItem item={oneMockOrder} />);
    const historyItem = screen.getByRole("article", { name: `Order ${oneMockOrder.orderNo}` });
    expect(historyItem).toBeTruthy();
  });
});