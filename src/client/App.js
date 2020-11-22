import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Navigation} from './Navigation';
import {Menu}from './menu/Menu';
import {Cart} from './cart/Cart';

export const MyContext = React.createContext();

function App() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch('/cart')
      .then(res => res.json())
      .then(initialCart => setCart(initialCart))
  }, []);

  const updateCart = (itemName, newQty) => {
    fetch(
      '/cart',
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

  return(
    <>
    <MyContext.Provider value={{cart, updateCart}}>
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
