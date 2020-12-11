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

//for this test, test that button is wired up to updateCart correctly, test that clicking the button does updateCart
//from dodds - test should typically only see/interact with the props that are passed, and the rendered output.

//I think what I need to do is to provide dummy info in order to test that the component is working
//by doing it that way, I ensure that I'm not too mired in the details
//for example, instead of checking how manu menuItems are rendered, I check instead that
//certain texts are available in the document
//doing it this way proves that menuItems are rendered
//maybe just provide the array with dummy info
//it ensures that the gears are working together if certain information are present in the screen
//it may not be as overt as this length of items in the array correspond to this many components in the screen
//but it does not care how the information is presented in the screen,
//it only cares that the information is in the screen
//it doesn't care about implementation, it only cares that the results are there
//it doesn't care that the components are created through mapping
//I think this is important because in the future, there may be better way
//of implementing things and if mapping was no longer used and I was testing for mapping, then
//the test would break even if the component is still working, with maybe even better code
