import React, {useContext} from 'react';
import './main.css';
import {CartItem} from './CartItem';
import {OrderSummary} from './OrderSummary';
import {MyContext} from './App';

export function Cart() {
  let cart = useContext(MyContext).cart;
  let updateCart = useContext(MyContext).updateCart;
  let subTotal = useContext(MyContext).subTotal;


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
                updateCart={updateCart} //should this be removed? since you'll be using MyContext
                />
              }

              return null;
            }
        )
      }
      </section>

      <section className="orderSummary">
        <OrderSummary subTotal={subTotal}/ >
      </section>
    </div>
  );
}

// export default Menu;
