import React, {useState, useEffect, useContext} from 'react';
import {MenuItem} from './MenuItem';
import {MyContext} from '../../App';

export function Menu() {
  const updateCart = useContext(MyContext).updateCart;
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch('/menu')
    .then(res => res.json())
    .then(menuItems => setMenuItems(menuItems))
  }, []);

  return (
    <div className="menu">
      {menuItems.map((item) => (
        <MenuItem
          key={item.name}
          name={item.name}
          price={item.price}
          imageLocation={item.imageLocation}
        />
      ))}
    </div>
  );
}

//interesting behaviour
//generating menu items
