const { expect, it } = require("@jest/globals");
const { MenuItem } = require("./menuItems");
const Cart = require("./cart.js");
// const {addItemToCart} = require("./cart");

//why is cart the only thing imported?
//why not functions?

//test usage
//how is cart used
//it is used by creating a new cart
//it is used by adding new cart items
//it is used by updating quantity of a cart item - add and subtract
//it is used by calculating subtotal
//it is used by calculating tax
//it is used by calculating total
it('creates a new cart', ()=> {
  const cappucino = new MenuItem('cappucino', 5, null);
  const cake = new MenuItem('cake', 5, null);
  const menuItems = [cappucino, cake];

  const newCart = new Cart(menuItems, .13, []);

  expect(newCart).toBeDefined();
  //when you're testing if it is returning something
  //how specific should you be?
});

// it('adds a new item', ()=> {
//   const cappucino = new MenuItem('cappucino', 5, null);
//   const cake = new MenuItem('cake', 5, null);
//   const menuItems = [cappucino, cake];
//
//   const addedItemToCart = addItemToCart(menuItems, [], 'cappucino', 5);
//
//   expect(addedItemToCart).toEqual(
//     [
//      {...cappucino,
//      quantity: 5}
//     ]
//   );
// })

// it('can add a new item', () => {
//   //given itemName and quantity
//   //when a new item is added to cart
//   //cart's cartItems will include new item
//
  // const itemName = 'Cappucino';
  // const quantity = 1;
  // const menuItems = [{name: 'Cappucino', quantity: 0}];
  // const cartItems = [];
//
//   const itemAdded = addItemToCart(menuItems, cartItems, itemName, quantity);
//
//   expect(itemAdded).toEqual({name: 'Cappucino', quantity: 1});
// });

it('can add a new cart item', () => {
  //given itemName and quantity
  //when a new item is added to cart,
  //cart's cart items will include new item
  const itemName = 'Cappucino';
  const quantity = 1;
  const menuItems = [{name: 'Cappucino', quantity: 0}];
  const testCart = new Cart(menuItems, .13);

  const itemAddedToCart = testCart.updateCart(itemName, quantity);

  expect(itemAddedToCart).toEqual({...testCart, cartItems: [{name: 'Cappucino', quantity: 1}]});

});

it('can add quantities from existing cart items', () => {
  //given and itemName and quantity to add,
  //when quantity is to be added to an existing cart item,
  //cart's cartItems will reflect the increase in quantity
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
  //given the cart items
  //when subtotal is asked for?
  //cart will calculate the subtotal
  const menuItems = [{name: 'Cappucino', quantity: 0}];
  const cartItems = [{name: 'Cappucino', price: 5, quantity: 5}];
  const testCart = new Cart(menuItems, .13, cartItems);

  const subtotal = testCart.subtotal;

  expect(subtotal).toBe(25);
});

it('can calculate tax', () => {
  //given the cart items
  //when the tax is asked for?
  //cart will calculate the tax
  const menuItems = [{name: 'Cappucino', quantity: 0}];
  const cartItems = [{name: 'Cappucino', price: 5, quantity: 2}];
  const testCart = new Cart(menuItems, .13, cartItems);

  const tax = testCart.tax;

  expect(tax).toBe(1.3);
})

it('can calculate total', () => {
  //given the cart items,
  //when the total is asked for,
  //cart will calculate the total
  const menuItems = [{name: 'Cappucino', quantity: 0}];
  const cartItems = [{name: 'Cappucino', price: 5, quantity: 2}];
  const testCart = new Cart(menuItems, .13, cartItems);

  const total = testCart.total;

  expect(total).toBe(11.3);

})
//questions
//why create new functions to create new menu items?
//why not use menuItems[0]
//because menuItems has those extra properties that might be annoying to test?
//like if you're checking if your expect equalling an object, you don't want to
//create an object with extraneous properties? like key: 'cappucino', imageLocation: 'cappucino.png'
//oh but can't you just spread the object?
