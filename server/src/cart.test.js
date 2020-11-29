const { describe, expect, it } = require("@jest/globals");
const { MenuItem } = require("./menuItems");
const Cart = require("./cart.js");

describe("shopping cart", () => {
  it("can add a new item", () => {
    const menuItem = menuItemNamed("Cappucino");
    const cart = new Cart([menuItem], 0.13, []);

    const updatedCart = cart.updateCart("Cappucino", 5);

    expect(updatedCart.cartItems).toContainEqual({
      ...menuItem,
      quantity: 5,
    });
  });

  it("can update the quantity of an existing item", () => {
    const menuItem = menuItemNamed("Cappucino");
    const cart = new Cart([menuItem], 0.13, [{ ...menuItem, quantity: 3 }]);

    const updatedCart = cart.updateCart("Cappucino", 8);

    expect(updatedCart.cartItems).toContainEqual({
      ...menuItem,
      quantity: 11,
    });
  });

  it("can reduce the quantity of an existing item", () => {
    const menuItem = menuItemNamed("Cappucino");
    const cart = new Cart([menuItem], 0.13, [{ ...menuItem, quantity: 7 }]);

    const updatedCart = cart.updateCart("Cappucino", -3);

    expect(updatedCart.cartItems).toContainEqual({
      ...menuItem,
      quantity: 4,
    });
  });

  it("can remove an item", () => {
    const menuItem = menuItemNamed("Cappucino");
    const cart = new Cart([menuItem], 0.13, [{ ...menuItem, quantity: 1 }]);

    const updatedCart = cart.updateCart("Cappucino", -1);

    expect(updatedCart.cartItems).toHaveLength(0);
  });

  it("can calculate the subtotal of all items", () => {
    const menuItem = menuItemWithPrice("Cake", 7);
    const cart = new Cart([menuItem], 0.13, []);

    const updatedCart = cart.updateCart("Cake", 3);

    expect(updatedCart.subtotal).toBe(21);
  });

  it("can apply taxes to the subtotal", () => {
    const menuItem = menuItemWithPrice("Cake", 10);
    const cart = new Cart([menuItem], 0.13, []);

    const updatedCart = cart.updateCart("Cake", 2);

    expect(updatedCart.tax).toBe(2.6);
  });

  it("can calculate a total cost of all items after taxes", () => {
    const menuItem = menuItemWithPrice("Cake", 10);
    const cart = new Cart([menuItem], 0.13, []);

    const updatedCart = cart.updateCart("Cake", 2);

    expect(updatedCart.total).toBe(22.6);
  });
});

function menuItemNamed(name) {
  return new MenuItem(name, 5, null);
}

function menuItemWithPrice(name, price) {
  return new MenuItem(name, price, null);
}
