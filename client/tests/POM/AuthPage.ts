import { RegisterPayload, LoginPayload } from "@/types/auth";
import { Locator, Page } from "@playwright/test";

export class AuthPage {
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