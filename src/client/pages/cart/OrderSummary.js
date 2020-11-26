import React, {useContext} from 'react';
import {MyContext} from '../../App';


export function OrderSummary(){
  let cart = useContext(MyContext).cart;
  let subTotal = cart.subTotal;
  let tax = cart.tax;
  let total = cart.total;

  return(
    <div className="orderSummary">
      <h2>Order Summary</h2>
      <div className="subTotal">
        <p>SubTotal</p>
        <p className="cost">{(subTotal).toFixed(2)}</p>
      </div>

      <div className="tax">
        <p>Tax</p>
        <p className="cost">{(tax).toFixed(2)}</p>
      </div>

      <div className="total">
        <p>Total</p>
        <p className="cost">{(total * 1.13).toFixed(2)}</p>
      </div>
    </div>
  );
}
