import React, {useContext} from 'react';
import {menuItems} from './menuItems';
import MenuItem from './MenuItem';
import {MyContext} from './App';

export function Menu() {
  // let cart = useContext(MyContext).cart;
  let updateCart = useContext(MyContext).updateCart;

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
