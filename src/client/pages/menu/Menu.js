import React, {useState, useEffect} from 'react';
import {MenuItem} from './MenuItem';

export function Menu() {
// const menuItems = fetch('/menu').then(res => res.json()).then(serverMenuItems => serverMenuItems); //why isn't this enough to deal with the response? //isn't assigning it to a binding enough?

const [x, setMenuItems] = useState([]);

useEffect(()=>{
  fetch('/menu')
  .then(res => res.json())
  .then(serverMenuItems => setMenuItems(serverMenuItems));
}, []);

console.log(`menuItems are ${x}`);
  return (
    <div className="menu">

      {
        console.log(x)

      }
      {
        x.map(
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
