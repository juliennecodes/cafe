const { describe, expect, it, beforeAll, beforeEach } = require("@jest/globals");
const request = require("supertest");
//module.exports is supertest, the one only thing exported
const { app } = require("./cafe-server");
//adding app property to module.exports, can have more properties exported
const { menuItems } = require("./menuItems");

beforeAll(async() => {
    process.env.NODE_ENV = 'test';
  }
);

beforeEach(async ()=>{
  await request(app).delete("/cart");
});
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
it('returns a cart with updated values when a client has sent a post request that decreases the item quantity', async ()=> {
  // await request(app).delete("/cart");
  //need an existing cart
  await request(app).post('/cart').send({
    itemName: 'Cappucino',
    newQty: 3
  });

  const response = await request(app).post('/cart').send({
    itemName: 'Cappucino',
    newQty: -1,
  });

  expect(response.body).toEqual({
    cartItems: [{...menuItems[0], quantity: 2}],
    subtotal: 10,
    tax: 1.3,
    total: 11.3
  });

});
//one way - test should be able to access cart and internal application, should see initial state
//gross way ^ sees app when it shouldn't

//another way - post twice
//odd ^ - testing decrement but also doing adding and removing

//question
//why test for subtotal, tax, total?
//isn't that the purview of cart?
//shouldn't the test just be whether the server is sending updated information?

//test because it is in response, here is what it's coming back
//does the entire payload of the cart contain correct information
