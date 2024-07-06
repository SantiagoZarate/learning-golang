import { SnippetFormType } from "@/helpers/createSnippetSchema"
import { Locator, Page } from "@playwright/test"
import { type Snippet as SnippetType } from "@/types/snippet"

export class HomePage {
  snippetForm: Locator
  snippetTitleField: Locator
  snippetContentField: Locator
  snippetExpiresDayField: Locator
  snippetCreateButton: Locator
  page: Page

  constructor(page: Page) {
    this.page = page
    this.snippetForm = this.page.getByTestId("snippet-form")
    this.snippetTitleField = this.page.getByTestId('snippet-title-field')
    this.snippetContentField = this.page.getByTestId('snippet-content-field')
    this.snippetExpiresDayField = this.page.getByTestId("snippet-expires-day-input")
    this.snippetCreateButton = this.page.getByTestId('snippet-form-button')
  }

  async fillSnippetForm({ content, title, expires }: Partial<SnippetFormType>) {
    await this.snippetTitleField.fill(title!);
    await this.snippetContentField.fill(content!);
    await this.snippetExpiresDayField.fill(String(expires!));
  }

  getSnippet({ id }: Pick<SnippetType, "id">) {
    return new Snippet(this.page, id)
  }
}

class Snippet {
  title: Locator
  content: Locator
  author: Locator

  constructor(page: Page, id: number) {
    this.title = page.getByTestId(`snippet-id-${id}-title`)
    this.content = page.getByTestId(`snippet-id-${id}-content`)
    this.author = page.getByTestId(`snippet-id-${id}-author`)
  }
}