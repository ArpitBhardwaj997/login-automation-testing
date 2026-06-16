const { test, expect } = require('@playwright/test');


const loginPage = 'http://127.0.0.1:5500/login-automation-testing/login.html';

// ✅ TEST 1 — Valid Login
test('Valid Login Test', async ({ page }) => {
  await page.goto(loginPage);
  
  await page.locator('#username').click();
  await page.locator('#username').type('admin');           // type() instead of fill()
  
  await page.locator('#password').click();
  await page.locator('#password').type('admin123');
  
  await page.locator('#loginBtn').click();
  
  await page.waitForSelector('#message');                  // Wait for message to appear

  const message = page.locator('#message');
  await expect(message).toHaveText('Login Successful! Welcome Admin!');
  await expect(message).toHaveClass('success');
});

// ❌ TEST 2 — Wrong Credentials
test('Invalid Login Test', async ({ page }) => {
  await page.goto(loginPage);

  await page.locator('#username').click();
  await page.locator('#username').type('wronguser');

  await page.locator('#password').click();
  await page.locator('#password').type('wrongpass');

  await page.locator('#loginBtn').click();

  await page.waitForSelector('#message');

  const message = page.locator('#message');
  await expect(message).toHaveText('Invalid username or password!');
  await expect(message).toHaveClass('error');
});

// ⚠️ TEST 3 — Empty Fields
test('Empty Fields Test', async ({ page }) => {
  await page.goto(loginPage);

  await page.locator('#loginBtn').click();

  await page.waitForSelector('#message');

  const message = page.locator('#message');
  await expect(message).toHaveText('Please fill in all fields!');
  await expect(message).toHaveClass('error');
});

// ⚠️ TEST 4 — Empty Password Only
test('Empty Password Test', async ({ page }) => {
  await page.goto(loginPage);

  await page.locator('#username').click();
  await page.locator('#username').type('admin');

  await page.locator('#loginBtn').click();

  await page.waitForSelector('#message');

  const message = page.locator('#message');
  await expect(message).toHaveText('Please fill in all fields!');
  await expect(message).toHaveClass('error');
});

// ⚠️ TEST 5 — Empty Username Only
test('Empty Username Test', async ({ page }) => {
  await page.goto(loginPage);

  await page.locator('#password').click();
  await page.locator('#password').type('admin123');

  await page.locator('#loginBtn').click();

  await page.waitForSelector('#message');

  const message = page.locator('#message');
  await expect(message).toHaveText('Please fill in all fields!');
  await expect(message).toHaveClass('error');
});