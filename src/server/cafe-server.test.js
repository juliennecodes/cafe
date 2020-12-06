const { describe, expect, it } = require("@jest/globals");
const request = require("supertest");
const { app } = require("./cafe-server");
const { menuItems } = require("./menuItems");

//test usage
//how is cafe server used
//it is used by sending menuItems
//it is used by sending current cart
//it is used by sending an updated cart

// it('can send menu items', () => {
//   //given a request body containing itemName and new quantity
//   //when server receives request directed to /menu
//   //server should send back an array
// });


// FROM WORKING TEST FILE
it("returns the menu items", async () => {
  const response = await request(app).get("/menu");

  expect(response.status).toBe(200);
  expect(response.get("Content-Type")).toMatch("application/json");
  expect(response.body).toEqual(menuItems);
});

it('can send menu items', async () => {
  //given a request body
  //when server receives request directed to /menu
  //server should send back an array

  //!! QUESTION !!
  // const clientRequest = request(app).get('/menu');
  // //what does request(app).get('/menu') resolve to?
  // //why is it response instead of request
  // //how do you get request itself?
  // //how do you do when here?

  const response = await request(app).get('/menu');

  expect(response.status).toBe(200);
  expect(response.get('Content-Type')).toMatch('application/json');
  expect(response.body).toEqual(menuItems);
});

it('sends an empty cart when there are no items', async () => {
  const response = await request(app).get('/cart');

  expect(response.status).toBe(200);
  expect(response.get('Content-Type')).toMatch('application/json');
  expect(response.body).toEqual({
      cartItems: [],
      subtotal: 0,
      tax: 0,
      total: 0,
  });
});

// // // FROM WORKING TEST FILE
// it("returns the current cart after updating cart items", async () => {
//     await request(app).delete("/cart");
//     const response = await request(app).post("/cart").send({
//       itemName: "Cappucino",
//       newQty: 1,
//     });
//
//     expect(response.status).toBe(200);
//     expect(response.get("Content-Type")).toMatch("application/json");
//     expect(response.body).toEqual({
//       cartItems: [{ ...menuItems[0], quantity: 1 }],
//       subtotal: 5,
//       tax: 0.65,
//       total: 5.65,
//     });
//   });

it('returns a cart when client has sent a post request with information', async () => {
  const response = await request(app).post('/cart').send({
    itemName: 'Cappucino',
    newQty: 1
  });
  //send takes care of stringify?

  expect(response.status).toBe(200);
  expect(response.get('Content-Type')).toMatch('application/json');
  expect(response.body).toEqual({
    // cartItems: [{name: 'Cappucino', quantity: 1}], - mistake
    cartItems: [{...menuItems[0], quantity: 1}],
    subtotal: 5,
    tax: .65,
    total: 5.65
  });
});

//!! QUESTION !!
//how do you test for subtraction?
//how do you set up an existing cart and have the response take that into account
// it('returns a cart with updated values when a client has sent a post request that decreases the item quantity', async ()=> {
//   //need an existing cart
//   let testCart = {
//     cartItems: [{...menuItems[0], quantity: 3}],
//     subtotal: 15,
//     tax: 1.95,
//     total: 16.95,
//   }
//
//   const response = await request(app).post('/cart').send({
//     itemName: 'Cappucino',
//     newQty: -1,
//   })
//
//   expect()
//
// });

//question
//why test for subtotal, tax, total?
//isn't that the purview of cart?
//shouldn't the test just be whether the server is sending updated information?