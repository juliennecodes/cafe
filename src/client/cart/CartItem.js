import React, {useContext} from 'react';
import '../main.css';
import {Quantity} from './Quantity'
import {MyContext} from '../App';

export function CartItem({name, price, imageLocation, quantity}) {
  let updateCart = useContext(MyContext).updateCart;

  return (
    <div className="cartItem">
      <img src={imageLocation}/>
      <p>{name}</p>
      <Quantity name={name} quantity={quantity} updateCart={updateCart}/>
      <p className="individualPrice">{`$${price * quantity}`}</p>
    </div>
  );
}
