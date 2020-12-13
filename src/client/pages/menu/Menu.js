import React, {useState, useEffect, useContext} from 'react';
import {MenuItem} from './MenuItem';
import {MyContext} from '../../App';

export function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch('/menu')
    .then(res => res.json())
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
        />
      ))}
    </div>
  );
}

//so what to test here,
//I want this component to be used for displaying menu items
//test that certain information from the database are present in the screen when
//menu component is rendered

// test('renders MenuItems', async()=> {
//   //given server, implicit
//   //server sends dummy menu items,
//
//   //expect text in dummy menu items to be in the document
//   //^is this sufficient enough proof that menu component is rendering menu items?
//
// });



it('renders menu item components', async()=>{
  //g

  //w
  render(<Menu />);

  //t
  expect(await screen.findByText(/Cappucino/)).toBeInTheDocument();
  expect(await screen.findByText(/Cake/)).toBeInTheDocument();

});
