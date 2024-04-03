import Page from "./page.js";
import { $ } from "@wdio/globals";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class Homepage extends Page {
  /**
   * define selectors using getter methods
   */
  public async gdprConsent(accept = false) {
    // if (
    await (await $(`div[class*='modal-overlay__display']`)).waitForDisplayed();
    // .isExisting()
    // ) {
    if (accept) {
      await (await $(`button[class*='button__accept-all']`)).click();
    } else {
      await (await $(`button[class*='button__deny-all]`)).click();
    }
    // }
  }
}

export default new Homepage();
