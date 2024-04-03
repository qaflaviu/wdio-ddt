import Page from "./page.js";
import { $ } from "@wdio/globals";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class Homepage extends Page {
  /**
   * Method to accept or deny GDPR consent
   */
  public async gdprConsent(accept = false) {
    try {
      await (
        await $(`div[class*='modal-overlay__display']`)
      ).waitForDisplayed({ timeout: 2000 });
      if (accept) {
        await (await $(`button[class*='button__accept-all']`)).click();
      } else {
        await (await $(`button[class*='button__deny-all']`)).click();
      }
      await (
        await $(`div[class*='modal-overlay__display']`)
      ).waitForDisplayed({ reverse: true });
    } catch (e) {
      console.log("No GDPR Banner");
    }
  }
}

export default new Homepage();
