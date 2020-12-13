import React, {useContext} from 'react';
import {MyContext} from '../../App';


export function Quantity({name, quantity}) {
  let updateCart = useContext(MyContext).updateCart;

  return (
    <div className="quantity">
      <button onClick={()=> {updateCart(name, -1)}} type="button" name="button">-</button>
      <input type="number" name="" value={quantity}/>
      <button onClick={()=> {updateCart(name, 1)}} type="button" name="button">+</button>
    </div>
  );
}

test('button is wired up to updateCart', async()=> {
  //given dummy server initial cart
  //name = 'Cappucino'
  //query for the button element

  //when button is clicked,

  //given updated cart, get request dummy server for current cart
  //that means you can't hardcode the dummy server because you want to be able to test that it is updating?
  //expect cappucino in cart item to be +1

})

it('updates cart when button is clicked', async()=>{
  //given dummy server
  //given initialCart with items
  //itemName = "Cappucino"
  //quantity = 2

  //when const {getByText} = render(<Quantity />) with props
  //is it like this?
  //render(<Quantity />);
  //render(Quantity({name: itemName, quantity: quantity})); <-is this kosher, property name is a string but property value is numeric, same spelling

  //expect(getByText(/3/)).toBeInTheDocument();
});
