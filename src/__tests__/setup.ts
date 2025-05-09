import { afterEach, beforeEach, vi } from "vitest";
import { resetMockStore } from "./test-utils";

export const mockUseAppSelector = vi.fn();
export const mockUseAppDispatch = vi.fn();

vi.mock("../hooks/appHooks", () => ({
    useAppSelector: mockUseAppSelector,
    useAppDispatch: () => mockUseAppDispatch,
}));

beforeEach(() => {
    resetMockStore(); // Reset the mock store before each test
});

afterEach(() => {
    resetMockStore(); // Reset the mock store before each test
});