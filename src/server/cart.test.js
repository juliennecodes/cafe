const { expect, it } = require("@jest/globals");
const { MenuItem } = require("./menuItems");
const Cart = require("./cart.js");

it('creates a new cart', ()=> {
  const cappucino = new MenuItem('cappucino', 5, null);
  const cake = new MenuItem('cake', 5, null);
  const menuItems = [cappucino, cake];

  const newCart = new Cart(menuItems, .13, []);

  expect(newCart).toBeDefined();

});


it('can add a new cart item', () => {
  const itemName = 'Cappucino';
  const quantity = 1;
  const menuItems = [{name: 'Cappucino', quantity: 0}];
  const testCart = new Cart(menuItems, .13);

  const itemAddedToCart = testCart.updateCart(itemName, quantity);

  expect(itemAddedToCart).toEqual({...testCart, cartItems: [{name: 'Cappucino', quantity: 1}]});

});

it('can add quantities from existing cart items', () => {
  const itemName = 'Cappucino';
  const quantity = 2;
  const menuItems = [{name: 'Cappucino', quantity: 0}];
  const cartItems = [{name: 'Cappucino', quantity: 5}]
  const testCart = new Cart(menuItems, .13, cartItems);

  const addedCart = testCart.updateCart(itemName, quantity);

  expect(addedCart).toEqual({...testCart, cartItems: [{name: 'Cappucino', quantity: 7}]});
});

it('can subtract quantities from existing cart items', () => {
  //given itemName and quantities to subtract,
  //when item is subtracted,
  //cart's cartItems will reflect the subtracted value
  const itemName = 'Cappucino';
  const quantity = -2;
  const menuItems = [{name: 'Cappucino', quantity: 0}];
  const cartItems = [{name: 'Cappucino', quantity: 5}]
  const testCart = new Cart(menuItems, .13, cartItems);

  const subtractedCart = testCart.updateCart(itemName, quantity);

  expect(subtractedCart).toEqual({...testCart, cartItems: [{name: 'Cappucino', quantity: 3}]});
});


it('can calculate subtotal', ()=>{
  const menuItems = [{name: 'Cappucino', quantity: 0}];
  const cartItems = [{name: 'Cappucino', price: 5, quantity: 5}];
  const testCart = new Cart(menuItems, .13, cartItems);

  const subtotal = testCart.subtotal;

  expect(subtotal).toBe(25);
});

it('can calculate tax', () => {
  const menuItems = [{name: 'Cappucino', quantity: 0}];
  const cartItems = [{name: 'Cappucino', price: 5, quantity: 2}];
  const testCart = new Cart(menuItems, .13, cartItems);

  const tax = testCart.tax;

  expect(tax).toBe(1.3);
});

it('can calculate total', () => {
  const menuItems = [{name: 'Cappucino', quantity: 0}];
  const cartItems = [{name: 'Cappucino', price: 5, quantity: 2}];
  const testCart = new Cart(menuItems, .13, cartItems);

  const total = testCart.total;

  expect(total).toBe(11.3);

});
