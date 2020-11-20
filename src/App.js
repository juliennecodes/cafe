import React, {useState, useEffect} from 'react';
import {menuItems} from './menuItems';
import {Menu}from './Menu';
import {Cart} from './Cart';
import {OrderSummary} from './OrderSummary';

const initialItems = menuItems.map(item => {return {key: item.name, ...item}});

function App() {
  const [cart, setCart] = useState(initialItems);
  const [subTotal, setSubTotal] = useState(0);

  const updateCart = (itemName, newQty) => {
    fetch(
      '/menu',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({itemName: itemName, newQty: newQty }),
      }
    )
    .then(res => res.json())
    .then(updatedCart => setCart(updatedCart));
  }

  useEffect(()=>{
      fetch('/subTotal',
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
      .then(res => res.json())
      .then(updatedSubTotal => setSubTotal(updatedSubTotal));
    }, [cart]);

  return(
    <>
    <Menu updateCart={updateCart}/>
    <Cart cart={cart} updateCart={updateCart}/>
    <OrderSummary subTotal={subTotal}/>
    </>
  );
}

export default App;
