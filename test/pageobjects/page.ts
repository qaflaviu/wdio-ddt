import { browser } from "@wdio/globals";

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  /**
   * Opens a sub page of the page
   * @param language path of language
   */
  public async open(language = Language.DEUTSCH) {
    browser.url(`https://www.douglas.de/${language}`);
    await this.insertGDPRCookie();
    await this.setLocalStorage();
    await browser.refresh();
  }

  public waitForPageLoad() {
    browser.waitUntil(
      () => browser.execute(() => document.readyState === "complete"),
      {
        timeout: 60 * 1000, // 60 seconds
        timeoutMsg: "Load Failed",
      }
    );
  }

  async waitForLoaderToDisappear() {
    await (
      await browser.$(`svg[class*='search-box__loader']`)
    ).waitForExist({
      reverse: true,
    });
  }

  async waitForSearchToFinish() {
    await (await browser.$(`svg[class*='success']`)).waitForExist({});
  }

  async setLocalStorage() {
    await browser.executeScript(
      'window.localStorage.setItem("uc_user_interaction", "true");',
      []
    );
  }

  async insertGDPRCookie() {
    browser.setCookies([
      {
        name: "douglas.de-consentReference",
        value: "89650acf-869b-41b4-98de-422de8fd5a1b",
        domain: "www.douglas.de",
      },
    ]);
  }

  async waitForUrlChange(url: string) {
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes(`${url}`),
      {
        timeout: 20000,
        timeoutMsg: `URL has not changed. Expected ${url}. but got ${await browser.getUrl()}.`,
      }
    );
  }
}

export enum Language {
  DEUTSCH = "de",
}
