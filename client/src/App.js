import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Navigation} from './Navigation';
import {Menu}from './menu/Menu';
import {Cart} from './cart/Cart';

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
      <Router>
        <Navigation />
        <Route path="/menu" render={(props) =>
          <Menu
            {...props}
            menuItemsPromise={fetch('/menu').then(res => res.json())}
            updateCart={updateCart}/>
          }
        />
        <Route path="/cart" render={(props) =>
          <Cart
            {...props}
            cart={cart}
            updateCart={updateCart}
            />
          }
        />
      </Router>
    </>
  );
}

export default App;
