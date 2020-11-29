const { describe, expect, it } = require("@jest/globals");
const request = require("supertest");
const { app } = require("./cafe-server");
const { menuItems } = require("./menuItems");

describe("menu endpoints", () => {
  it("returns the menu items", async () => {
    const response = await request(app).get("/menu");

    expect(response.status).toBe(200);
    expect(response.get("Content-Type")).toMatch("application/json");
    expect(response.body).toEqual(menuItems);
  });
});

describe("cart endpoints", () => {
  it("returns an empty cart if no items have been added", async () => {
    await request(app).delete("/cart");
    const response = await request(app).get("/cart");

    expect(response.status).toBe(200);
    expect(response.get("Content-Type")).toMatch("application/json");
    expect(response.body).toEqual({
      cartItems: [],
      subtotal: 0,
      tax: 0,
      total: 0,
    });
  });

  it("returns the current cart after updating cart items", async () => {
    await request(app).delete("/cart");
    const response = await request(app).post("/cart").send({
      itemName: "Cappucino",
      newQty: 1,
    });

    expect(response.status).toBe(200);
    expect(response.get("Content-Type")).toMatch("application/json");
    expect(response.body).toEqual({
      cartItems: [{ ...menuItems[0], quantity: 1 }],
      subtotal: 5,
      tax: 0.65,
      total: 5.65,
    });
  });

  it("adds items to the cart and calculates subtotal, tax, and total", async () => {
    await request(app).delete("/cart");
    await request(app).post("/cart").send({
      itemName: "Cake",
      newQty: 1,
    });

    const response = await request(app).get("/cart");

    expect(response.status).toBe(200);
    expect(response.get("Content-Type")).toMatch("application/json");
    expect(response.body).toEqual({
      cartItems: [{ ...menuItems[4], quantity: 1 }],
      subtotal: 5,
      tax: 0.65,
      total: 5.65,
    });
  });
});
