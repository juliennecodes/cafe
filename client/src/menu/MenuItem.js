import React from 'react';


function MenuItem({name, price, imageLocation, updateCart}) {
  return (
    <div className="menuItem">
      <img src={imageLocation}/>
      <p>{name}</p>
      <p>{`$${price}`}</p>
      <button onClick={()=>updateCart(name, 1)}>Add to Cart</button>
    </div>
  );
}

export default MenuItem;
