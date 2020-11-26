import React, {useContext} from 'react';
import '../main.css';
import {CartItem} from './CartItem';
import {OrderSummary} from './OrderSummary';
import {MyContext} from '../App';

export function Cart() {
  let cart = useContext(MyContext).cart;

  return (
    <div className="cart">

      <section className="cartItems">
      {
        cart.cartItems.map(
          item =>
            {
              if(item.quantity > 0){
                return <CartItem
                imageLocation = {item.imageLocation}
                name ={item.name}
                price = {item.price}
                quantity = {item.quantity}
                />
              }

              return null;
            }
        )
      }
      </section>

      <section className="orderSummary">
        <OrderSummary
          subtotal={cart.subtotal}
          tax={cart.tax}
          total={cart.total}/ >
      </section>
    </div>
  );
}

// export default Menu;
