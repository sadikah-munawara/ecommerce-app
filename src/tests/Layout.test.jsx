import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

test("Layout renders navbar and footer", () => {

  render(
    <MemoryRouter>
      <Navbar cartCount={0} wishlistCount={0} />
      <Footer />
    </MemoryRouter>
  );

  const title = screen.getByText(/mystore/i);

  expect(title).toBeTruthy();

});