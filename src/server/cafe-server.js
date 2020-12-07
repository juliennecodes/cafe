const { menuItems } = require("./menuItems");
const Cart = require("./cart");
const express = require("express");
const app = express();

let cart = new Cart(menuItems, 0.13, []);

app.use(express.json());

app.get("/menu", (req, res) => {
  res.json(menuItems);
});

app.get("/cart", (req, res) => {
  res.json(cart.toJson());
});

app.post("/cart", (req, res) => {
  let itemName = req.body.itemName;
  let newQty = req.body.newQty;

  cart = cart.updateCart(itemName, newQty);

  res.status(200).json(cart.toJson());
});

app.delete("/cart", (req, res) => {
  cart = new Cart(menuItems, 0.13, []);
  res.end();
});

const port = process.env.NODE_ENV === 'test' ? 8001 : 8000;
//when node is running, process - contains useful information in context of running node application
//one of useful is env - access to environment variables
app.listen(port);

exports.app = app;
// module.exports = app;
//module.exports is an object
//module.exports way, no longer an object you can add properties to, it is app
