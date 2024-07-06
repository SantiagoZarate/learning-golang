import { type Snippet } from "@/types/snippet";
import test, { expect } from "@playwright/test";
import { AuthPage } from "./POM/AuthPage";
import { HomePage } from "./POM/HomePage";
import { baseURL, testSnippet, credentials } from "./setup";

test('navigate to home and see no snippets', async ({ page }) => {
  await page.route('*/**/src/data/snippets.json', async route => {
    const json: [] = [];
    await route.fulfill({ json });
  });

  await page.goto(baseURL + 'home', {
    timeout: 60000
  });

  await expect(page.getByTestId("no-snippets-found")).toBeDefined()
});

test('navigate to home and see one snippet', async ({ page }) => {
  await page.route('**/src/data/snippets.json', async route => {
    const json: Snippet[] = [testSnippet];
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(json)
    });
  });

  await page.goto(baseURL + 'home', {
    timeout: 60000
  });

  const snippet = new HomePage(page).getSnippet({ id: 1 })

  await expect(snippet.title).toHaveText(testSnippet.title)
  await expect(snippet.content).toHaveText(testSnippet.content)
});

test.describe("Logged actions with snippets and no snippets in home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/src/data/snippets.json', async route => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([])
      });
    });

    await page.goto(baseURL + 'login');
    const authPage = new AuthPage(page)

    await authPage.loginUser(credentials)
    await page.context().addCookies([
      { name: 'access_token', value: 'myCOOKIE', path: '/', domain: 'localhost' }
    ]);

    await page.goto(baseURL + 'home');
  })

  test('login and create a snippet', async ({ page }) => {
    const homePage = new HomePage(page)

    const newSnippet = {
      title: "Test title",
      content: "Test snippet",
      expires: 2
    }

    await page.waitForSelector('[data-testid="snippet-form"]')
    await homePage.fillSnippetForm(newSnippet)

    await expect(async () => {
      console.log("| 🔵 | Intentando crear snippet...")
      await homePage.snippetForm.press("Enter")
      await expect(homePage.snippetCreateButton).toBeDisabled()
    }).toPass()

  });
})

