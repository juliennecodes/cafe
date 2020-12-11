const { describe, expect, it, beforeAll, beforeEach } = require("@jest/globals");
const request = require("supertest");
const { app } = require("./cafe-server");
const { menuItems } = require("./menuItems");

beforeAll(async() => {
    process.env.NODE_ENV = 'test';
  }
);

beforeEach(async ()=>{
  await request(app).delete("/cart");
});

//test
//how you want the component to be used
//I want cafe server component to be used as a request handler
//server receives requests and sends things back
//server receives get request to menu and sends menuItems object
//server receives get request to cart and sends cart object
//server receives post request to cart and sends cart object -
  //^I almost wrote server receives post requests, uses that information to change cart, and sends cart object but maybe I shouldn't get mired in details, that's the test's given concern
  //subset of post request - things may go haywire if -1 post request to an object that doesn't exist in cart?

it('receives get request and sends back an object', async() => {
  // const response = await request.get('/menu'); // mistake
  const response = await request(app).get("/menu");

  expect(response.body).toEqual([...menuItems]);
});

it('receives get request to cart and sends cart object', async() => {
  const response = await request(app).get('/cart');

  expect(response.body).toEqual({
    cartItems: [],
    subtotal: 0,
    tax: 0,
    total:0
  });
});
//supertest, starts server, and communicates with it, and acts like a client?
//the reason I didn't have to create a testCart in given is that the response given
//is a real response by the server?

it('receives post request to cart and sends back a cart object', async() => {
  const response = await request(app).post('/cart').send({
    itemName: 'Cappucino',
    newQty: 1,
  })
  const cappucino = menuItems[0];

  expect(response.body).toEqual({
    cartItems: [{...cappucino, quantity: 1}],
    subtotal: 5,
    tax: .65,
    total: 5.65,
  });
});

//fix the issue of deducting from an empty cart
// it('receives post request to deduct an item that is not in cart and sends back a cart object', async () => {
//   const response = await request(app).post('/cart').send({
//     itemName: 'Cappucino',
//     newQty: -1
//   });
//
//   expect(response.body).toEqual({
//     cartItems: [],
//     subtotal: 0,
//     tax: 0,
//     total: 0
//   });
// });
