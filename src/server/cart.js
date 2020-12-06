class Cart {
  constructor(menuItems, taxRate, cartItems) {
    this.menuItems = menuItems;
    this.taxRate = taxRate;
    this.cartItems = cartItems || [];
  }

  updateCart(itemName, newQty) {
    const cartItems = this.cartItems;
    const updatedCartItems = isInCart(cartItems, itemName)
      ? updateItemQuantity(cartItems, itemName, newQty)
      : addItemToCart(this.menuItems, cartItems, itemName, newQty);

    return new Cart(this.menuItems, this.taxRate, updatedCartItems);
  }

  get subtotal() {
    return this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  get tax() {
    return this.subtotal * this.taxRate;
  }

  get total() {
    return this.subtotal + this.tax;
  }

  toJson() {
      return {
        cartItems: this.cartItems,
        subtotal: this.subtotal,
        tax: this.tax,
        total: this.total,
      }
  }
}

function isInCart(cartItems, itemName) {
  for (const item of cartItems) {
    if (item.name === itemName) {
      return true;
    }
  }
}

function updateItemQuantity(cartItems, itemName, newQty) {
  return cartItems
    .filter((item) => item.name !== itemName || item.quantity + newQty > 0)
    .map((item) => {
      if (item.name === itemName) {
        if (item.quantity === 0 && newQty === -1) {
          return item;
        }
        return { ...item, quantity: item.quantity + newQty };
      }
      return item;
    });
}


function addItemToCart(menuItems, cartItems, itemName, newQty) {
  const [itemToAdd] = menuItems.filter((item) => item.name === itemName);
  return [...cartItems, { ...itemToAdd, quantity: newQty }];
}

// module.exports = {cartClass: Cart, addItemToCart, updateItemQuantity};
//how do you export class when you're exporting other things as well?

module.exports = Cart;
