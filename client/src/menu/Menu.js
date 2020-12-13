import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

export function Menu({menuItemsPromise, updateCart}) { 
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    menuItemsPromise
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
