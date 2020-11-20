import React from 'react';
import './main.css';
import {CartItem} from './CartItem';

export function Cart({cart, updateCart}) {
  return (
    <div className="cart">

      <section className="cartItems">
      {
        cart.map(
          item =>
            {
              if(item.quantity > 0){
                return <CartItem
                imageLocation = {item.imageLocation}
                name ={item.name}
                price = {item.price}
                quantity = {item.quantity}
                updateCart={updateCart}
                />
              }

              return null;
            }
        )
      }
      </section>
    </div>
  );
}

// export default Menu;
