import '../main.css';
import {Quantity} from './Quantity'

export function CartItem({name, price, imageLocation, quantity, updateCart}) {
  return (
    <div className="cartItem">
      <img src={imageLocation}/>
      <p>{name}</p>
      <Quantity name={name} quantity={quantity} updateCart={updateCart}/>
      <p className="individualPrice">{`$${price * quantity}`}</p>
    </div>
  );
}
