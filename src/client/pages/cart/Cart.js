import React, {useContext} from 'react';
import {CartItem} from './CartItem';
import {OrderSummary} from './OrderSummary';
import {MyContext} from '../../App';


export function Cart() {
const cart = useContext(MyContext).cart;
const cartItems = cart.cartItems;

console.log(cart);
console.log(cartItems);

  return (
    <div className="cart">
      <section className="cartItems">
        {cartItems.map(
            item =>
              {
                return <CartItem
                imageLocation = {item.imageLocation}
                name ={item.name}
                price = {item.price}
                quantity = {item.quantity}
                />
              }
        )}
      </section>

      <section className="orderSummary">
        <OrderSummary/ >
      </section>
    </div>
  );
}

// export default Menu;
