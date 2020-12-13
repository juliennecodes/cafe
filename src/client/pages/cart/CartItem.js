import React, {useContext} from 'react';
import {Quantity} from './Quantity'

export function CartItem({name, price, imageLocation, quantity}) {

  return (
    <div className="cartItem">
      <img src={imageLocation} alt={name}/>
      <p>{name}</p>
      <Quantity name={name} quantity={quantity}/>
      <p className="individualPrice">{`$${price * quantity}`}</p>
    </div>
  );
}
