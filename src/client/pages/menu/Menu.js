import React, {useState, useEffect, useContext} from 'react';
import {MenuItem} from './MenuItem';
import {MyContext} from '../../App';

export function Menu() {
// const menuItems = fetch('/menu').then(res => res.json()).then(serverMenuItems => serverMenuItems); //why isn't this enough to deal with the response? //isn't assigning it to a binding enough?
let cart = useContext(MyContext).cart;
console.log(`cart is ${cart}`);
const [menuItems, setMenuItems] = useState([]);

useEffect(()=>{
  fetch('/menu')
  .then(res => res.json())
  .then(serverMenuItems => setMenuItems(serverMenuItems));
}, []);

console.log(`menuItems are ${menuItems}`);
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
          />
        )
      }
    </div>
  );
}
