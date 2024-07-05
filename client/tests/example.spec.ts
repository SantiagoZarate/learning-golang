import { SnippetFormType } from '@/helpers/createSnippetSchema';
import { LoginPayload, RegisterPayload } from '@/types/auth';
import { Locator, Page, expect, test } from '@playwright/test';

class HomePage {
  snippetForm: Locator
  snippetTitleField: Locator
  snippetContentField: Locator

  constructor(page: Page) {
    this.snippetForm = page.getByTestId("snippet-form")
    this.snippetTitleField = this.snippetForm.locator('[name="title"]')
    this.snippetContentField = this.snippetForm.locator('[name="content"]')
  }

  async createSnippet({ content, title }: Partial<SnippetFormType>) {
    await this.snippetTitleField.fill(title!);
    await this.snippetContentField.fill(content!);
  }
}

class AuthPage {
  authForm: Locator
  usernameField: Locator
  passwordField: Locator
  emailField: Locator

  constructor(page: Page) {
    this.authForm = page.getByTestId('auth-form');
    this.usernameField = this.authForm.locator('[name="username"]');
    this.passwordField = this.authForm.locator('[name="password"]')
    this.emailField = this.authForm.locator('[name="email"]')
  }

  async registerUser({ email, password, username }: RegisterPayload) {
    await this.emailField.fill(email);
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.authForm.press("Enter")
  }

  async loginUser({ password, username }: LoginPayload) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.authForm.press("Enter")
  }
}

const baseURL = "http://localhost:8001/"

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

test('login and create a new snippet', async ({ page }) => {
  const credentials = {
    password: "userpass",
    username: "username"
  }

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

  // Expect toaster to pop up with text
  expect(page.getByTestId("toaster-title")).toHaveText("Registered succesfully")


  await page.goto(baseURL + 'home', {
    timeout: 60000
  });

  const homePage = new HomePage(page)

  await homePage.createSnippet({
    title: "Test title",
    content: "Test snippet"
  })

  expect(homePage.snippetTitleField).toBeEmpty()
  expect(homePage.snippetContentField).toBeEmpty()
});