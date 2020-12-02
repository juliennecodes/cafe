import React, {useContext} from 'react';
import {CartItem} from './CartItem';
import {OrderSummary} from './OrderSummary';
import {MyContext} from '../../App';


export function Cart() {
  let cart = useContext(MyContext).cart;

   return (


       cart.cartItems ?
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
       :
       <p>Loading</p>



   );
}

//notes
//So the error of cannot map undefined is because in the first render, cart is undefined
//useEffect takes effect after rendering and it just so happens that defining the cart is done through useEffect
//set up a conditional rendering, if cart evaluates to true, which means it is defined, render away
//if it isn't, then render a loading icon
//however, I tried cart but it was still creating an error
//cart exists but it takes a bit more time for the properties to populate it?
//so at the time, cart evaluates to true but the property cartItems is still undefined
//using cart.cartItems is the more stringent check on what should be rendered
