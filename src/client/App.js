import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Navigation} from './Navigation';
import {Homepage} from './pages/Homepage';
import {Menu}from './pages/menu/Menu';
import {Cart} from './pages/cart/Cart';

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
          <Route path="/" component = {Homepage} exact/>
          <Route path="/menu" component={Menu}/>
          <Route path="/cart" component={Cart} />
        </Router>
      </MyContext.Provider>
    </>
  );
}

export default App;