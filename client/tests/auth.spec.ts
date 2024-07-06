import { expect, test } from '@playwright/test';
import { AuthPage } from './POM/AuthPage';
import { baseURL, credentials } from './setup';

test('register user and get redirected', async ({ page }) => {
  await page.goto(baseURL + 'register', {
    timeout: 60000
  });
  const authPage = new AuthPage(page)

  await authPage.registerUser({
    ...credentials,
    email: "usertest@gmail.com",
  })

  // Expect a title be redirected to landing page
  expect(page.url()).toStrictEqual(baseURL);

  // Expect toaster to pop up with text
  await page.waitForSelector('[data-testid="toaster-title"]');
  await expect(page.getByTestId("toaster-title")).toHaveText("Registered succesfully")
});

test('login and see username on header', async ({ page }) => {
  await page.goto(baseURL + 'login', {
    timeout: 60000
  });

  const authPage = new AuthPage(page)

  await authPage.loginUser(credentials)

  // Expect a title be redirected to landing page
  expect(page.url()).toStrictEqual(baseURL);

  // Expect to see username on header
  await page.waitForSelector('[data-testid="header-username"]');
  expect(page.getByTestId("header-username")).toHaveText(credentials.username, {
    ignoreCase: true
  })
});