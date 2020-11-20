import React from 'react';

export function Quantity({name, quantity, updateCart}) {
  return (
    <div className="quantity">
      <button onClick={()=> {updateCart(name, -1)}} type="button" name="button">-</button>
      <input type="number" name="" value={quantity}/>
      <button onClick={()=> {updateCart(name, 1)}} type="button" name="button">+</button>
    </div>
  );
}
 
