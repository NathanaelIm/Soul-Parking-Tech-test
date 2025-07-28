
# 🚀 SauceDemo Playwright Automation Tests



A comprehensive automation testing suite built with Playwright for the SauceDemo e-commerce website. This project aims to ensure the critical functionalities of the application are working as expected through robust and reliable automated tests.

## ✨ Features

This test automation suite covers key functionalities of the SauceDemo website, including but not limited to:

* **Login Scenarios:**
    * Successful login with valid credentials.
    * Handling invalid username/password.
    * Validation for empty username/password fields.
    * Testing locked-out user scenarios.
* **Shopping Cart Management:**
    * Adding products to the cart.
    * Removing products from the cart.
    * Verifying cart contents.
* **Checkout Process:**
    * Successful checkout flow (entering personal information, confirming order).

## 🛠️ Technologies Used

* **[Playwright](https://playwright.dev/)**: A powerful Node.js library to automate Chromium, Firefox and WebKit with a single API.
* **[Dotenv](https://www.npmjs.com/package/dotenv)**: To load environment variables from a `.env` file, keeping sensitive data out of the codebase.
* **[Node.js](https://nodejs.org/)**: The JavaScript runtime environment.

## ⚙️ Prerequisites

Before running these tests, ensure you have the following installed:

* **Node.js** (LTS version recommended)
* **npm** (Node Package Manager, usually comes with Node.js)
* **Git**

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/NathanaelIm/Soul-Parking-Tech-test.git](https://github.com/NathanaelIm/Soul-Parking-Tech-test.git)
    cd Soul-Parking-Tech-test
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install Playwright and other necessary packages.

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```
    This command downloads the browser binaries (Chromium, Firefox, WebKit) that Playwright uses.

## 🔑 Configuration (`.env` file)

To manage sensitive data and configurations, this project uses a `.env` file.

1.  Create a file named `.env` in the root directory of your project.
2.  Add the following variables to your `.env` file:

    ```
    BASE_URL="https://www.saucedemo.com"
    VALID_USERNAME="standard_user"
    VALID_PASSWORD="secret_sauce"
    LOCKED_USERNAME="locked_out_user"
    ```
    **Note:** **Do NOT** commit your `.env` file to version control (it's already included in `.gitignore`).

## 🚀 How to Run Tests

### Running All Tests

To run all tests across configured browsers (default: Chromium):

```bash
npx playwright test

