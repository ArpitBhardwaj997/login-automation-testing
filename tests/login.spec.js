const { test, expect } = require('@playwright/test');

const loginPage = 'http://127.0.0.1:5500/login-automation-testing/login.html';

// ✅ TEST 1 — Valid Login
test('Valid Login Test', async ({ page }) => {
  await page.goto(loginPage);
  await page.waitForLoadState('domcontentloaded');
  await page.fill('#username', 'admin');
  await page.fill('#password', 'admin123');
  await page.click('#loginBtn');
  await page.waitForSelector('#message');
  const message = page.locator('#message');
  await expect(message).toHaveText('Login successful! Welcome back, Admin!');
});

// ❌ TEST 2 — Wrong Credentials
test('Invalid Login Test', async ({ page }) => {
  await page.goto(loginPage);
  await page.waitForLoadState('domcontentloaded');
  await page.fill('#username', 'wronguser');
  await page.fill('#password', 'wrongpass');
  await page.click('#loginBtn');
  await page.waitForSelector('#message');
  const message = page.locator('#message');
  await expect(message).toHaveText('Invalid username or password. Please try again.');
});

// ⚠️ TEST 3 — Empty Fields
test('Empty Fields Test', async ({ page }) => {
  await page.goto(loginPage);
  await page.waitForLoadState('domcontentloaded');
  await page.click('#loginBtn');
  await page.waitForSelector('#message');
  const message = page.locator('#message');
  await expect(message).toHaveText('Please fill in all fields!');
});

// ⚠️ TEST 4 — Empty Password
test('Empty Password Test', async ({ page }) => {
  await page.goto(loginPage);
  await page.waitForLoadState('domcontentloaded');
  await page.fill('#username', 'admin');
  await page.click('#loginBtn');
  await page.waitForSelector('#message');
  const message = page.locator('#message');
  await expect(message).toHaveText('Please fill in all fields!');
});

// ⚠️ TEST 5 — Empty Username
test('Empty Username Test', async ({ page }) => {
  await page.goto(loginPage);
  await page.waitForLoadState('domcontentloaded');
  await page.fill('#password', 'admin123');
  await page.click('#loginBtn');
  await page.waitForSelector('#message');
  const message = page.locator('#message');
  await expect(message).toHaveText('Please fill in all fields!');
});