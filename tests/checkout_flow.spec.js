import { test, expect } from "@playwright/test";
require("dotenv").config();

test.describe("Checkout Flow", () => {
  const [username, password] = [
    process.env.VALID_USERNAME,
    process.env.VALID_PASSWORD,
    process.env.LOCKED_USERNAME,
  ];
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill(username);
    await page.locator("#password").fill(password);
    await page.locator("#login-button").click();
  });
  test("TC-12 Add product to cart", async ({ page }) => {
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
    await page.locator(".shopping_cart_link").click();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    await expect(page.locator(".cart_item")).toHaveCount(1);
    await expect(page.locator(".inventory_item_name")).toHaveText(
      "Sauce Labs Backpack"
    );
  });
  test("TC-13 Remove product from cart", async ({ page }) => {
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await expect(page.locator(".shopping_cart_badge")).toHaveCount(1);
    await page.locator("#remove-sauce-labs-backpack").click();
    await page.locator(".shopping_cart_link").click();
    await expect(page.locator(".cart_item")).toHaveCount(0);
  });
  test("TC-14 Checkout process", async ({ page }) => {
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator(".shopping_cart_link").click();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    await page.locator("#checkout").click();
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
    await page.locator("#first-name").fill("Nathanael");
    await page.locator("#last-name").fill("Immanuel");
    await page.locator("#postal-code").fill("12345");
    await page.locator("#continue").click();
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
    await expect(page.locator(".inventory_item_name")).toContainText(
      "Sauce Labs Backpack"
    );

    // Complete the checkout
    await page.locator("#finish").click();

    // Verify order completion
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html"
    );
    await expect(page.locator(".complete-header")).toHaveText(
      "Thank you for your order!"
    );
  });
});
