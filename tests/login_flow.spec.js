import { test, expect } from "@playwright/test";
require("dotenv").config();

test.describe("Login flow", () => {
  const [url, username, password, lockedUsername] = [
    process.env.BASE_URL,
    process.env.VALID_USERNAME,
    process.env.VALID_PASSWORD,
    process.env.LOCKED_USERNAME,
  ];
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });
  test("TC-01 Login with valid credentials", async ({ page }) => {
    await page.locator("#user-name").click();
    await page.locator("#user-name").fill(username);
    await page.locator("#password").click();
    await page.locator("#password").fill(password);
    await page.locator("#login-button").click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".title")).toHaveText("Products");
  });
  test("TC-02 Login with invalid credentials", async ({ page }) => {
    await page.locator("#user-name").click();
    await page.locator("#user-name").fill("invalid_user");
    await page.locator("#password").click();
    await page.locator("#password").fill("invalid_password");
    await page.locator("#login-button").click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
  test("TC-03 Login with empty credentials", async ({ page }) => {
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username is required"
    );
  });
  test("TC-04 Login with wrong password", async ({ page }) => {
    await page.locator("#user-name").click();
    await page.locator("#user-name").fill(username);
    await page.locator("#password").click();
    await page.locator("#password").fill("wrong_password");
    await page.locator("#login-button").click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
  test("TC-05 Login with empty password", async ({ page }) => {
    await page.locator("#user-name").click();
    await page.locator("#user-name").fill(username);
    await page.locator("#login-button").click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Password is required"
    );
  });
  test("TC-06 Login with locked out user", async ({ page }) => {
    await page.locator("#user-name").click();
    await page.locator("#user-name").fill(lockedUsername);
    await page.locator("#password").click();
    await page.locator("#password").fill(password);
    await page.locator("#login-button").click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});
