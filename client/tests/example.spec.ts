import { expect, test } from '@playwright/test';
import { AuthPage } from './POM/AuthPage';
import { HomePage } from './POM/HomePage';

const baseURL = "http://localhost:8001/"
const credentials = {
  password: "userpass",
  username: "username"
}

test('register user and get redirected', async ({ page }) => {
  await page.goto(baseURL + 'register', {
    timeout: 60000
  });
  const authPage = new AuthPage(page)

  await authPage.registerUser({
    email: "usertest@gmail.com",
    password: "userpass",
    username: "username"
  })

  // Expect a title be redirected to landing page
  expect(page.url()).toStrictEqual(baseURL);

  // Expect toaster to pop up with text
  expect(page.getByTestId("toaster-title")).toHaveText("Registered succesfully")
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
  expect(page.getByTestId("header-username")).toHaveText(credentials.username, {
    ignoreCase: true
  })
});

test('login and createa a snippet', async ({ page }) => {
  await page.goto(baseURL + 'login', {
    timeout: 60000
  });

  const authPage = new AuthPage(page)
  await authPage.loginUser(credentials)

  await page.goto(baseURL + 'home', {
    timeout: 60000
  });

  const homePage = new HomePage(page)
  await homePage.createSnippet({
    title: "Test title",
    content: "Test snippet",
    expires: 2
  })

  await expect(homePage.snippetCreateButton).toBeDisabled()
  // await expect(homePage.snippetForm.getByRole('[type="submit"]')).toBeDisabled()
  // await expect(homePage.snippetContentField).toBeDisabled()
});