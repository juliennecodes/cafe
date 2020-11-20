import React from 'react';
import {menuItems} from './menuItems';
import MenuItem from './MenuItem';

export function Menu({updateCart}) {
  return (
    <div className="menu">

      {
        menuItems.map(
          item =>  <MenuItem
          key={item.name}
          name={item.name}
          price={item.price}
          imageLocation = {item.imageLocation}
          quantity={item.quantity}
          updateCart={updateCart}
          />
        )
      }
    </div>
  );
}

// export default Menu;
