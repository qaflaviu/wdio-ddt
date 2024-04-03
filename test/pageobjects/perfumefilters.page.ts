import Page from "./page.js";
import { $ } from "@wdio/globals";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class PerfumeFilters extends Page {
  public get classificationFilter() {
    return $(`div[data-testid='classificationClassName']`);
  }
  public get brandFilter() {
    return $(`div[data-testid='brand']`);
  }

  public get presentFilter() {
    return $(`div[data-testid='Geschenk für']`);
  }

  public get genderFilter() {
    return $(`div[data-testid='gender']`);
  }

  async openClassificationFilter() {
    await (await this.classificationFilter).click();
  }

  async openBrandFilter() {
    await (await this.brandFilter).click();
  }

  async openPresentFilter() {
    await (await this.presentFilter).click();
  }

  async openGenderFilter() {
    await (await this.genderFilter).click();
  }

  async selectFromClassification(classification: CLASSIFICATIONS) {
    await (await $(`div=${classification}`)).click();
  }

  async selectFromBrand(brand: BRANDS) {
    await (await $(`div=${brand}`)).click();
  }

  async selectFromPresentFor(presentFor: PRESENT_FOR) {
    await (await $(`div=${presentFor}`)).click();
  }

  async selectFromDropdown(itemText: any) {
    await (await $(`div=${itemText}`)).click();
  }

  async clickSearchButton() {
    await (await $(`button[class*='facet__close-button']`)).click();
  }
}

export default new PerfumeFilters();

export enum CLASSIFICATIONS {
  EAU_DE_PARFUM = "Eau de Parfum",
  EAU_DE_TOILETTE = "Eau de Toilette",
}

export enum BRANDS {
  A_AND_F = "Abercrombie & Fitch",
  AC = "4711 Acqua Colonia",
}

export enum PRESENT_FOR {
  BIRTHDAY = "Geburtstag",
  THANKS = "Dankeschön",
}

export enum GENDER {
  MAN = "Männlich",
  UNISEX = "Unisex",
}
