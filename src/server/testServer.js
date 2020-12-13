const {rest} = require('msw');
const { setupServer} = require('msw/node');

const cartWithNoItems = {
    cartItems: [],
    subtotal: 0,
    tax:0,
    total: 0
},

// imageLocation = {item.imageLocation}
// name ={item.name}
// price = {item.price}
// quantity = {item.quantity}
const cartWithItems = {
  cartItems: [
    {imageLocation: "/path.png", name: "Cappucino", price: 5, quantity: 2},
    {imageLocation: "/path.png", name: "Cake", price: 5, quantity: 1}
  ],
  subtotal: 15,
  tax:1.95,
  total:16.95
}

const updatedCartWithItems = {
  cartItems: [
    {imageLocation: "/path.png", name: "Cappucino", price: 5, quantity: 3},
    {imageLocation: "/path.png", name: "Cake", price: 5, quantity: 1}
  ],
  subtotal: 20,
  tax:2.6,
  total:22.6
}


const server = setupServer(
  rest.get("/menu", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        0: {
          name: "Dummy Name",
          price: 10,
          imageLocation: "/path.png"
        },
        1: {
          name: "Dummy Name",
          price: 10,
          imageLocation: "/path.png"
        },
      })
    )
  }),

  rest.get("/cart", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(cartWithNoItems),
    )
  }),

  rest.get("/cartWithItems", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(cartWithItems);
    )
  })

  rest.post("/cart", (req, res, ctx) => {
    const newQty = req.body.newQty;

    if(newQty === 1) {
      return res(
        ctx.status(200),
        ctx.json(updatedCartWithItems);
      )
    }

    else {
      return null;
    }

  })
);
