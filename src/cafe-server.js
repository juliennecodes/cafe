const express = require("express");
const app = express();

//------------------------------------------------------------------------------
class MenuItem{
  constructor(name, price, imageLocation){
    this.key = name;
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
]

let cart =  menuItems;
// [
//    {key: "Cappucino", name: "Cappucino", price: 5, imageLocation: "images/cappucino.png", quantity: 0 },
//    {key: "Cake", name: "Cake", price: 5, imageLocation: "images/cake.png", quantity: 0 },
// ]
//------------------------------------------------------------------------------
// let subtotal = menuItems.reduce((accumulatedMenuItem, newMenuItem) => accumulatedMenuItem.price + (newMenuItem.price * newMenuItem.quantity), 0);
//------------------------------------------------------------------------------
const reducer = (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity);
let subtotal = cart.reduce(reducer, 0);
// array1.reduce(reducer, 5)
//------------------------------------------------------------------------------
let tax = 1.13;
let grandTotal = subtotal * tax;

//------------------------------------------------------------------------------

app.use(express.json());

app.get('/menu', (req, res) => {
  res.json(cart);
});

app.get('/cart', (req, res) => {
  res.json(cart);
});

app.post('/menu', (req, res) => {
  console.log(`req is ${req}`);
  console.log(`req body is ${req.body}`);

  let itemName = req.body.itemName;
  let newQty = req.body.newQty;

  console.log(`server's been hit with a post request`);

  let updatedCart = cart.map(
    item => {
      if(item.name === itemName){
            if(item.quantity === 0 && newQty === -1){return item};
            return {...item, quantity: item.quantity + newQty};
          }
          return item;
    }
  )

  cart = updatedCart;

  res.json(cart);
  res.status(201).end();
});



app.listen(8000, ()=> console.log('listening on port 8000'));
