import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Navigation} from './Navigation';
import {menuItems} from './menuItems';
import {Menu}from './Menu';
import {Cart} from './Cart';

const initialItems = menuItems.map(item => {return {key: item.name, ...item}});

export const MyContext = React.createContext();

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
    .then(updatedCart => {
      console.log(updatedCart);
      setCart(updatedCart);
    });
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
    <MyContext.Provider value={{cart, subTotal, updateCart}}>
        <Router>
          <Navigation />
          <Route path="/menu" component={Menu}/>
          <Route path="/cart" component={Cart} />
        </Router>
      </MyContext.Provider>

    </>
  );
}

export default App;
