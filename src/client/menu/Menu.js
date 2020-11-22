import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../App";
import MenuItem from "./MenuItem";

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
          quantity={item.quantity}
          updateCart={updateCart}
        />
      ))}
    </div>
  );
}

// export default Menu;
