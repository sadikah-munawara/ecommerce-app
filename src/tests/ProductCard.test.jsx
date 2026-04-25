import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { describe, it, expect } from "vitest";

describe("ProductCard Snapshot", () => {

  it("matches snapshot", () => {

    const product = {
      id: 1,
      title: "Test Product",
      price: 999,
      image: "test.jpg"
    };

    const { container } = render(
      <MemoryRouter>
        <ProductCard
          product={product}
          addToCart={() => {}}
          wishlist={[]}
          toggleWishlist={() => {}}
        />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();

  });

});