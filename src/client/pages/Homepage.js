import React from 'react';
import {Link} from 'react-router-dom';


export function Homepage(){
  return(
    <>
      <h1>Have a pleasant time at Pleasant Cafe!</h1>
      <p>Come check out our <Link to={`/menu`}> menu </Link> </p>
    </>
  );
};
