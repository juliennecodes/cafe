import React, {useContext} from 'react';
import {CartItem} from './CartItem';
import {OrderSummary} from './OrderSummary';
import {MyContext} from '../../App';


export function Cart() {
  let cart = useContext(MyContext).cart;

   return (
       cart.cartItems ?
       <div className="cart">

      <section className="cartItems">
      {
        cart.cartItems.map(
          item =>
            {
              if(item.quantity > 0){
                return <CartItem
                imageLocation = {item.imageLocation}
                name ={item.name}
                price = {item.price}
                quantity = {item.quantity}
                />
              }

              return null;
            }
        )
      }
      </section>

      <section className="orderSummary">
        <OrderSummary
          subtotal={cart.subtotal}
          tax={cart.tax}
          total={cart.total}/ >
      </section>
    </div>
       :
       <p>Loading</p>



   );
}

// //test that this component renders cart items
// test('renders cart items', async()=> {
//   //use the dummy server
//   //dummy server provides dummy cart with several cart items
//   //expect for the dummy information to be in the document
// });
//
// test('renders order summary', async()=> {
//   //given the dummy cart in the dummy server
//   //let cart = get request to dummy server /cart - dummy server has a readymade cart with cart items, not an empty array
//   //expect dummy information to be in the document
// });
// //do I test this here? all this component is doing is passing properties? well it also renders the component,
// //maybe just check that certain information is in the document

it('renders cart items', async()=> {
  //given cart
  //fetch cart - how to use this instead of react create context?

  render(<Cart />);
  //renders cart component, renders cartItems from cart state and its property cartItems

  expect(await screen.getBytext(/Cappucino/)).toBeInTheDocument();
  //^ cart item in cart with items
});

it('renders order summary', async()=>{
  //given cart object

  // render(<OrderSummary />) with cart properties or should this test be in order summary?
  //actually the test might just be props being passed down
  //so render it with dummy information?

  //expect(await screen.getByText(/dummy information/)).toBeInTheDocument();
});
