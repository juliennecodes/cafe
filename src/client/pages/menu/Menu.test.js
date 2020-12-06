const { expect, it} = require("@jest/globals");
// const { render } = require ('@testing-library/react');
const { Menu } = require("./Menu");

//test usage
//this component is used to fetch menu items
//this component is used for rendering menu item

//   test('should handle useEffect hook', () => {
//     const sideEffect = { [1]: false, [2]: false }
//
//     const { rerender, unmount } = renderHook(
//       ({ id }) => {
//         useEffect(() => {
//           sideEffect[id] = true
//           return () => {
//             sideEffect[id] = false
//           }
//         }, [id])
//       },
//       { initialProps: { id: 1 } }
//     )
//
//     expect(sideEffect[1]).toBe(true)
//     expect(sideEffect[2]).toBe(false)
//
//     rerender({ id: 2 })
//
//     expect(sideEffect[1]).toBe(false)
//     expect(sideEffect[2]).toBe(true)
//
//     unmount()
//
//     expect(sideEffect[1]).toBe(false)
//     expect(sideEffect[2]).toBe(false)
//
//
//
// it('can fetch menu items from the server', () => {
//   //given the menu component,
//   //when it makes a fetch request to the server
//   //then it will receive an array
//
//   render(Menu);
//
// })

it('can receive menu items when component requests it from the server', () => {
  //given render menu component
  //when fetch in useEffect happens
  //then menuItems should be defined
  //then menuItems should be an array? how much involvement with the server should be included?
  //are you responsible for knowing that the server will send back an array with so and so specific items?
});

it('renders the right amount of components, as dictated by the menu items', () => {
  //given render menu component
  //query for the div? data testid?
  //then div children should be length of menuitems
});
//is this test necessary? why wouldn't it render the right amount if it is mapping through each one?
//isn't it a given that the menu item component will correspond to the menu items?
