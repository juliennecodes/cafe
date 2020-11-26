const express = require("express");
const app = express();
const menuItems = require('./menuItems');

let cart = {
  cartItems: [],
  subtotal: 0,
  tax: 0,
  total: 0
};

app.use(express.json());

app.get("/menu", (req, res) => {
  res.json(menuItems);
});

app.get("/cart", (req, res) => {
  res.json(cart);
});

//------------------------------------------------------------------------------
app.post("/cart", (req, res) => {
  let itemName = req.body.itemName;
  let newQty = req.body.newQty;
  cart = updateCart(menuItems, cart, itemName, newQty);

  res.status(200).json(cart);
});

//------------------------------------------------------------------------------
//HELPER FUNCTIONS
function updateCart(menuItems, cart, itemName, newQty) {
  let cartItems = cart.cartItems;
  let updatedCartItems;

  if (isInCart(cart, itemName)) {
    updatedCartItems = updateItemQuantity(cartItems, itemName, newQty);
  }

  else {
    updatedCartItems = addItemToCart(cartItems, itemName, newQty);
  }

  const subtotal = calculateSubtotal(updatedCartItems);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax);

  return {...cart, cartItems: updatedCartItems, subtotal, tax, total};
}


function isInCart(cart, itemName){
  let cartItems = cart.cartItems;

  for (const item of cartItems) {
    if (item.name === itemName) {
      return true;
    }
  }
}

function updateItemQuantity(cartItems, itemName, newQty){
  return cartItems.map((item) => {
    if (item.name === itemName) {
      if (item.quantity === 0 && newQty === -1) {
        return item;
      }
      return { ...item, quantity: item.quantity + newQty };
    }
    return item;
  });
}

function addItemToCart(cartItems, itemName, newQty){
  const [itemToAdd] = menuItems.filter(item => item.name === itemName);
  return [...cartItems, {...itemToAdd, quantity: newQty}];
}

function calculateSubtotal(cartItems){return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);}
function calculateTax(subtotal){return subtotal * .13;}
function calculateTotal(subtotal, tax){return subtotal + tax;}

app.listen(8000, () => console.log("listening on port 8000"));
