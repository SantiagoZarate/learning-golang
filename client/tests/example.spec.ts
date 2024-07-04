import { LoginPayload, RegisterPayload } from '@/types/auth';
import { Locator, Page, expect, test } from '@playwright/test';

class AuthPage {
  form: Locator
  usernameField: Locator
  passwordField: Locator
  emailField: Locator

  constructor(page: Page) {
    this.form = page.getByTestId('auth-form');
    this.usernameField = this.form.locator('name="name"');
    this.passwordField = this.form.locator('name="password"')
    this.emailField = this.form.locator('name="email"')
  }

  async registerUser({ email, password, username }: RegisterPayload) {
    await this.emailField.fill(email);
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.form.press("Enter")
  }

  async loginUser({ password, username }: LoginPayload) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.form.press("Enter")
  }
}

const baseURL = "http://localhost:8001"

test('register user', async ({ page }) => {
  await page.goto(baseURL + '/register', {
    timeout: 30000
  });
  const authPage = new AuthPage(page)

  authPage.registerUser({
    email: "usertest@gmail.com",
    password: "userpass",
    username: "username"
  })

  // Expect a title be redirected to landing page
  expect(page.url()).toStrictEqual(baseURL);
});

test.skip('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
