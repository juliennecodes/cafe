import React from 'react';

export function OrderSummary({subTotal}){
  return(
    <div className="orderSummary">
      <h2>Order Summary</h2>
      <div className="subTotal">
        <p>SubTotal</p>
        <p className="cost">{(subTotal).toFixed(2)}</p>
      </div>

      <div className="tax">
        <p>Tax</p>
        <p className="cost">{(subTotal * .13).toFixed(2)}</p>
      </div>

      <div className="total">
        <p>Total</p>
        <p className="cost">{(subTotal * 1.13).toFixed(2)}</p>
      </div>
    </div>
  );
}
