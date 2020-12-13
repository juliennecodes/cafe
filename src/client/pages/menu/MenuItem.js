import React, {useContext} from 'react';
import {MyContext} from '../../App';


export function MenuItem({name, price, imageLocation}) {
  let updateCart = useContext(MyContext).updateCart;

  return (
    <div className="menuItem">
      <img src={imageLocation} alt={name}/>
      <p>{name}</p>
      <p>{`$${price}`}</p>
      <button onClick={()=>updateCart(name, 1)}>Add to Cart</button>
    </div>
  );
}

//I want this component to be used for updating the quantity of items in the cart
//for testing, make sure that clicking the button updates the state cart
//how to test
//provide dummy state using msw
//path to /cart gets intercepted and dummy server returns dummycart
//so when you click the button, you receive dummy cart
//maybe capture that initial dummy cart value and expect the quantity of an item to increase by 1?

// test('button updates cart', async() => {
//   //given dummy server, is in another file so it can be used by other tests,
//   //^implicit given
//   //given initialCart value of 'Cappucino' in cart items having quantity of 2
//   //given name = 'Cappucino'
//
//
//   //render MenuItem
//   //query for the button, using getByRole?
//   //click that button
//
//   //expect serverResponse to be, spread initialCart, with cartItems being spread cartItems,
//   //with Cappucino, being spread Cappucino with quantity = 3
// });

it('button updates cart item quantity', async()=>{
  //g
  let initialCart = getRequestInitialCart();
  const itemName = "Cappucino";
  const price = 5;
  const imageLocation = "cappucino.png";

  const {getByRole} = render(<MenuItem key={itemName} name={itemName} price={price} imageLocation={imageLocation} />);
  const button = getByRole('button', {name: /add to cart/});

  //w
  fireEvent.click(button);

  //t
  expect(fireEvent.click(button)).toEqual({
    ...initialCart, cartItems: [...cartItems, cartItems[0]: {...cartItems[0], quantity: 3}]
  });

});

function getRequestInitialCart(){
  fetch("/cartWithItems")
  .then(res=> res.json())
  .then(cart => cart);
}
