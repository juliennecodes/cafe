import React from 'react';
import {Link} from 'react-router-dom';


export function Navigation() {
  return (
    <div className="navigation">
      <ul>
        <li><Link to={`/`}> Home </Link> </li>
        <li><Link to={`/menu`}> Menu </Link></li>
        <li><Link to={`/cart`}> Cart </Link></li>
      </ul>
    </div>
  );
}
