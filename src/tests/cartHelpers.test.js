import { describe, it, expect } from "vitest";
import { addItem } from "../utils/cartHelpers";

describe("Cart Helper", () => {

  it("adds new product to cart", () => {

    const cart = [];
    const product = { id: 1, title: "Phone", quantity: 1 };

    const result = addItem(cart, product);

    expect(result.length).toBe(1);

  });

  it("increments quantity if product exists", () => {

    const cart = [{ id: 1, title: "Phone", quantity: 1 }];
    const product = { id: 1, title: "Phone", quantity: 1 };

    const result = addItem(cart, product);

    expect(result[0].quantity).toBe(2);

  });

});