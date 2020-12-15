const { expect, it } = require("@jest/globals");
const { render } = require("@testing-library/react");
const { Menu } = require("./Menu");

it("displays information about each menu item", async () => {
  const menu = [
    { name: "Coffee", price: 2, imageLocation: "coffee.png", quantity: 2 },
    { name: "Cake", price: 5, imageLocation: "cake.png", quantity: 3 },
  ];

  const { findByText } = render(
      <Menu menuItemsPromise={Promise.resolve(menu)}/>
  );

  expect(await findByText(/Coffee/)).toBeTruthy();
  expect(await findByText(/Cake/)).toBeTruthy();
});
