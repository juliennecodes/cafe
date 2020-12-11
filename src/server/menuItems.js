class MenuItem {
  constructor(name, price, imageLocation) {
    // this.key = name;
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

exports.MenuItem = MenuItem;
exports.menuItems = menuItems;
