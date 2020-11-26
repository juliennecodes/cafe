import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Navigation} from './Navigation';
import {Homepage} from './pages/Homepage';
import {Menu}from './pages/menu/Menu';
import {Cart} from './pages/cart/Cart';

export const MyContext = React.createContext();

function App() {
  const [cart, setCart] = useState({
    cartItems: [],
    subTotal: 0,
    tax: 0,
    total: 0,
  });

  const updateCart = (itemName, newQty) => {
    fetch('/cart', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({itemName, newQty}),
    })
    .then(res => {
      console.log(`res is ${res}`);
      res.json()
    })
    .then(serverCart =>
      { console.log(`serverCart is ${serverCart}`);
        setCart(serverCart)}
    );
  }

  useEffect(()=>{
    fetch('/cart')
    .then(res => res.json())
    .then(serverCart => {
      console.log(`from useEffect in app when making get request to cart, serverCart is ${serverCart}`);
      setCart(serverCart)})
  }, []);

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
