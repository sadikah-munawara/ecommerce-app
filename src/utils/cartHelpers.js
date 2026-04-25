export function addItem(cart, product) {

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + product.quantity }
        : item
    );
  }

  return [...cart, product];
}