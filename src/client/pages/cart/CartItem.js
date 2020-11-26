import React, {useContext} from 'react';
import {Quantity} from './Quantity'
import {MyContext} from '../../App';

export function CartItem({name, price, imageLocation, quantity}) {
  let updateCart = useContext(MyContext).updateCart;

  return (
    <div className="cartItem">
      <img src={imageLocation} alt={name}/>
      <p>{name}</p>
      <Quantity name={name} quantity={quantity} updateCart={updateCart}/>
      <p className="individualPrice">{`$${price * quantity}`}</p>
    </div>
  );
}
