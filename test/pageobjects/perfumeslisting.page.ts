import { PRODUCT_STATE } from "../utils/enums.js";
import Page from "./page.js";
import { $ } from "@wdio/globals";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class PerfumesListingPage extends Page {
  public get headlineWrapper() {
    return $(`div[class*='headline-wrapper']`);
  }

  public get listedProducts() {
    return $$(`div[data-testid="product-tile"]`);
  }

  public get productEyecatcher() {
    return $$('div[data-testid="product-eyecatcher"]');
  }

  public get productCategories() {
    return $$(`div[class='text category']`);
  }

  public get productBrand() {
    return $$(`div[class='text top-brand']`);
  }

  async getTotalProducts(): Promise<string> {
    const text = await (await this.headlineWrapper).getText();
    const regex: RegExp = /\((\d+(\.\d+)?)\)/;

    const matchArray: RegExpMatchArray | null = text.match(regex);

    if (matchArray !== null) {
      const extractedNumber: string = matchArray[1];
      return extractedNumber;
    } else {
      throw new Error("No number found in headline");
    }
  }

  async getListedProductsCount(): Promise<number> {
    return await this.listedProducts.length;
  }

  async getProductPromos(state: PRODUCT_STATE): Promise<number> {
    const eyecatchers = await this.productEyecatcher;
    const matchingElements = await eyecatchers.filter(async (element) =>
      (await element.getText()).includes(state)
    );
    return matchingElements.length;
  }

  async getResultsCategories(): Promise<string[]> {
    const categories = await this.productCategories;
    return categories.map(async (element) => await element.getText());
  }

  async getResultsBrand(): Promise<string[]> {
    const brand = await this.productBrand;
    return brand.map(async (element) => await element.getText());
  }
}

export default new PerfumesListingPage();
