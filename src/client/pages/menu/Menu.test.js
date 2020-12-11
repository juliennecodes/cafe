// const { expect, it } = require("@jest/globals");
// const { render, screen } = require ('@testing-library/react');
// const { Menu } = require("./Menu");
//
//
// // test how you want the component to be used
// //I want the menu component to be used for rendering the menuItems in the menuItems array
// //the component renders menuItems components from the menuItems in the array
// //so for the test, it tests whether the number of components match the number of menuItems in the array?
// //do I test for fetch?
// //If I'm going by the credo of how I want the component to be used, all I care about is that
// //the menuItems are being rendered
// //perhaps if there is an error in rendering that, then take a look at what in the pipeline is not working?
// //for now, it's fine?
//
// //so the test for menu component is testing whether information is present
// //the user only cares that information is there, it doesn't matter what method that is achieved through
// //hmmm, then isn't that the purview of menu item
// //unless, I give it multiple objects
// //menu component takes in an array and translates those as components
// //it doesn't matter how menu component does that, just that it does
//
// // it('displays information from an array', async () => {
// //
// //   //when menuItems is rendered, it asks the server for the array,
// //   //maybe mock a server response with Promise.resolve
// //   //dummy server sends back an array
// //   //menu component uses that information to render menuItems
// //   //to check that it is displaying information, ask that certain information is
// //   //present in the screen
// //
// //   //oh maybe not Promise.resolve?
// //   //just check that it's rendering?
// //   //maybe create a different test
// // });
//
// it('renders a Menu component', async ()=> {
//   render(<Menu />);
//
//   expect(screen.queryByText(/Menu/)).toBeNull();
//   screen.debug();
//   expect(await screen.findByText(/Menu/)).toBeInTheDocument();
//   screen.debug();
//
// });
//

const { expect, it } = require("@jest/globals");
const { render, screen } = require ('@testing-library/react');
const { Menu } = require("./Menu");
const {rest} = require('msw');
const { setupServer} = require('msw/node');

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
      ctx.json(
        {
          cartItems: [],
          subtotal: 0,
          tax:0,
          total: 0
        }
      )
    )
  })

);

beforeAll(() =>  server.listen());
afterAll(() => server.close());
afterEach(()=> server.resetHandlers());

it('renders', async ()=> {
  render(<Menu />);
    expect(screen.queryByText(/Menu/)).toBeNull();
    screen.debug();
    expect(await screen.findByText(/Menu/)).toBeInTheDocument();
    screen.debug();
});
