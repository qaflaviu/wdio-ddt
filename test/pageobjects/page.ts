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
  public open(language = Language.DEUTSCH) {
    return browser.url(`https://www.douglas.de/${language}`);
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
    (await browser.$(`svg[class*='search-box__loader']`)).waitForExist({
      reverse: true,
    });
  }
}

export enum Language {
  DEUTSCH = "de",
}
