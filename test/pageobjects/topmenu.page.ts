import Page from "./page.js";
import { $ } from "@wdio/globals";

class TopMenu extends Page {
  async navigateToSection(section: TopMenuSection) {
    await (await $(`a[href*='${section}']`)).click();
  }
}

export enum TopMenuSection {
  PERFUME = "/c/parfum/01",
}

export default new TopMenu();
