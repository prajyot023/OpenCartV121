import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a relative URL path or full URL
   */
  async navigateTo(path: string = ''): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Returns current page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Returns current page URL
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Wait for specific URL
   */
  async waitForUrl(urlOrPattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(urlOrPattern);
  }

  /**
   * Take a full page screenshot
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }
}
