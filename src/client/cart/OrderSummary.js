import React from 'react';

export function OrderSummary({subtotal, taxRate, total}){
  return(
    <div className="orderSummary">
      <h2>Order Summary</h2>
      <div className="subTotal">
        <p>SubTotal</p>
        <p className="cost">{subtotal.toFixed(2)}</p>
      </div>

      <div className="tax">
        <p>Tax</p>
        <p className="cost">{(taxRate * subtotal - subtotal).toFixed(2)}</p>
      </div>

      <div className="total">
        <p>Total</p>
        <p className="cost">{total.toFixed(2)}</p>
      </div>
    </div>
  );
}
