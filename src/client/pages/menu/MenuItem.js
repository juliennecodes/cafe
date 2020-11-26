import React, {useContext} from 'react';
import {MyContext} from '../../App';


export function MenuItem({name, price, imageLocation}) {
  let updateCart = useContext(MyContext).updateCart;

  return (
    <div className="menuItem">
      <img src={imageLocation} alt={name}/>
      <p>{name}</p>
      <p>{`$${price}`}</p>
      <button onClick={()=>updateCart(name, 1)}>Add to Cart</button>
    </div>
  );
}
