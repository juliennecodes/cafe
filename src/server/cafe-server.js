const express = require("express");
const app = express();

//------------------------------------------------------------------------------
class MenuItem {
  constructor(name, price, imageLocation) {
    this.key = name;
    this.name = name;
    this.price = price;
    this.imageLocation = imageLocation;
    this.quantity = 0;
  }
}

const cappucino = new MenuItem("Cappucino", 5, "images/cappucino.png");
const icedCoffee = new MenuItem("Iced Coffee", 3, "images/icedCoffee.png");
const strongCoffee = new MenuItem(
  "Strong Coffee",
  5,
  "images/strongCoffee.png"
);
const espresso = new MenuItem("Espresso", 3, "images/espresso.png");
const cake = new MenuItem("Cake", 5, "images/cake.png");

const menuItems = [cappucino, icedCoffee, strongCoffee, espresso, cake];

let cart = {
  cartItems: [],
  subtotal: 0,
  taxRate: 1.13,
  total: 0
};
// [
//    {key: "Cappucino", name: "Cappucino", price: 5, imageLocation: "images/cappucino.png", quantity: 0 },
//    {key: "Cake", name: "Cake", price: 5, imageLocation: "images/cake.png", quantity: 0 },
// ]
//------------------------------------------------------------------------------
// let subtotal = menuItems.reduce((accumulatedMenuItem, newMenuItem) => accumulatedMenuItem.price + (newMenuItem.price * newMenuItem.quantity), 0);
//------------------------------------------------------------------------------
// const reducer = (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity);
// let subtotal = cart.reduce(reducer, 0);
// array1.reduce(reducer, 5)
//------------------------------------------------------------------------------
// let tax = 1.13;
// let grandTotal = subtotal * tax;

//------------------------------------------------------------------------------

app.use(express.json());

// This is our own "middleware" that we could use to log messages about
// each request the server is handling. We can also add our own properties
// if we want.

// function logRequestInfo(req, res, next) {
//   console.log(`req made to ${req.url}`);
//   console.log(`server's been hit with a ${req.method} request`);
//   req.myProp = 'hello from middleware';
//   next();
// }

// app.use('/menu', logRequestInfo);

app.get("/menu", (req, res) => {
  res.json(menuItems);
});

app.get("/cart", (req, res) => {
  res.json(cart);
});

function updateCart(menuItems, cart, itemName, newQty) {
  let cartItems = cart.cartItems;
  let foundItem = false;
  for (const item of cartItems) {
    if (item.name === itemName) {
      foundItem = true;
    }
  }
  
  let updatedCartItems;
  if (foundItem) {
    updatedCartItems = cartItems.map((item) => {
      if (item.name === itemName) {
        if (item.quantity === 0 && newQty === -1) {
          return item;
        }
        return { ...item, quantity: item.quantity + newQty };
      }
      return item;
    });
  } else {
    const [itemToAdd] = menuItems.filter(item => item.name === itemName);
    updatedCartItems = [...cartItems, {...itemToAdd, quantity: newQty}];
  }

  const subtotal = updatedCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal * cart.taxRate;

  return {...cart, cartItems: updatedCartItems, subtotal, total};
}

app.post("/cart", (req, res) => {
  let itemName = req.body.itemName;
  let newQty = req.body.newQty;
  cart = updateCart(menuItems, cart, itemName, newQty);

  res.status(200).json(cart);
});

app.listen(8000, () => console.log("listening on port 8000"));
