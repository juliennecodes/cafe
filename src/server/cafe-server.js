const express = require("express");
const app = express();
// const menuItems = require("./menuItems");
app.use(express.json());

class MenuItem{
  constructor(name, price, imageLocation){
    this.name = name;
    this.price = price;
    this.imageLocation = imageLocation;
    this.quantity = 0;
  }
}

const cappucino = new MenuItem("Cappucino", 5, "images/cappucino.png");
const icedCoffee = new MenuItem("Iced Coffee", 3, "images/icedCoffee.png");
const strongCoffee = new MenuItem("Strong Coffee", 5, "images/strongCoffee.png");
const espresso = new MenuItem("Espresso", 3, "images/espresso.png");
const cake = new MenuItem("Cake", 5, "images/cake.png");


const menuItems = [
cappucino,
icedCoffee,
strongCoffee,
espresso,
cake
];

//------------------------------------------------------------------------------
app.get('/menu', (req, res) => {
  res.json(menuItems);
});

//------------------------------------------------------------------------------
let cart = {
  cartItems: [],
  subTotal: 0,
  tax: 0,
  total: 0,
}

app.get('/cart', (req, res)=> {
  res.json(cart);
});

function isInCart(cart, itemName){
  // const found = array1.find(element => element > 10);
  cart.cartItems.find(item => item.name === itemName);
}

function updateCartItems(itemName, newQty){
  console.log(`typeof cart.cartItems is ${typeof cart.cartItems}`);
  let updatedCartItems = cart.cartItems;
  if(isInCart(cart, itemName)){
    return updatedCartItems.map(item => {
      if(item.name === itemName) {return {...item, quantity: item.quantity + newQty}}
      return item;
    })
  }

  else if (updatedCartItems.length === 0) {
    return updatedCartItems.push({...menuItems[itemName], quantity: menuItems[itemName] + newQty});
  }

  else {
    return updatedCartItems.map(item => {
      if(item.name === itemName){
        return {...item, quantity: item.quantity + newQty};
      }
      else return item;
    });
  }
}

function calculateSubTotal(cartItems){
  const reducer = (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity);
  const subTotal = cartItems.reduce(reducer, 0);
  return subTotal;
}

function calculateTax(subTotal){
  return subTotal * .13;
}

function calculateTotal(subTotal, tax){
  return subTotal + tax;
}

app.post('/cart', (req, res) => {
  console.log(`req.body is ${req.body}`);
  let itemName = req.body.itemName;
  let newQty = req.body.newQty;
  console.log(`itemName is ${itemName}`);
  console.log(`req.body.itemName is ${req.body.itemName}`);
  console.log(`newQty is ${newQty}`);
  console.log(`req.body.newQty is ${req.body.newQtys}`);

  let updatedCartItems = updateCartItems(itemName, newQty);
  console.log(`updatedCartItems is ${updatedCartItems}`);
  let updatedSubtotal = calculateSubTotal(updatedCartItems);
  console.log(`updatedSubtotal is ${updatedSubtotal}`);
  let updatedTax = calculateTax(updatedSubtotal);
  let updatedTotal = calculateTotal(updatedSubtotal, updatedTax);

  let updatedCart = {
    cartItems: updatedCartItems,
    subTotal: updatedSubtotal,
    tax: updatedTax,
    total: updatedTotal,
  };

  cart = updatedCart;

  res.status(200).json(updatedCart);

});

app.listen(8000, ()=> console.log('listening on port 8000'));
