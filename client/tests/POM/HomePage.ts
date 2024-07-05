import { SnippetFormType } from "@/helpers/createSnippetSchema"
import { Locator, Page } from "@playwright/test"

export class HomePage {
  snippetForm: Locator
  snippetTitleField: Locator
  snippetContentField: Locator
  snippetExpiresDayField: Locator
  snippetCreateButton: Locator

  constructor(page: Page) {
    this.snippetForm = page.getByTestId("snippet-form")
    this.snippetTitleField = page.getByTestId('snippet-title-field')
    this.snippetContentField = page.getByTestId('snippet-content-field')
    this.snippetExpiresDayField = page.getByTestId("snippet-expires-day-input")
    this.snippetCreateButton = this.snippetForm.getByRole('button', { name: "post" })
  }

  async createSnippet({ content, title, expires }: Partial<SnippetFormType>) {
    await this.snippetTitleField.fill(title!);
    await this.snippetContentField.fill(content!);
    await this.snippetExpiresDayField.fill(String(expires!));
    // await this.snippetForm.press("Enter")
    await this.snippetCreateButton.click()
  }
}