import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import CartItem from "../components/CartItem";
import { initialMenu } from "../data/initialMenu";
import type { ICartType } from "../utils/types";
import { getFormattedNumber } from "../utils/func";


const quantityOne = 1
const quantityFive = 5
const cartItemOne: ICartType = { ...initialMenu[0], quantity: quantityOne}
const cartItemFive: ICartType = { ...initialMenu[0], quantity: quantityFive}

describe("With React Testing Library", () => {
    it('Should display cart item', () => {
      renderWithProviders(<CartItem  item={cartItemOne}/>);
      const itemName = screen.getByText(cartItemOne.name);
      expect(itemName.textContent).toContain(initialMenu[0].name);
    });
    
    it('Should display correct price and quantity of item added', async() => {
      renderWithProviders(<CartItem  item={cartItemOne}/>);
      const itemQuantity = screen.getByText(cartItemOne.quantity);
      expect(itemQuantity.textContent).toContain(quantityOne);
      const priceElem = document.querySelectorAll('.price')
      expect(priceElem[0].textContent).toContain((initialMenu[0].price));

    });
    it('Should display correct price and 5 quantity of item', async() => {
      renderWithProviders(<CartItem  item={cartItemFive}/>);
      const itemQuantity = screen.getByText(cartItemFive.quantity);
      expect(itemQuantity.textContent).toContain(quantityFive);
      const priceElem = document.querySelectorAll('.price')
      expect(priceElem[0].textContent).toContain(getFormattedNumber(initialMenu[0].price * quantityFive));
    });
});