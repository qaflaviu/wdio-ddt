import { expect } from "@wdio/globals";
import Homepage from "../pageobjects/homepage.page.js";
import TopMenu from "../pageobjects/topmenu.page.js";
import { TopMenuSection } from "../pageobjects/topmenu.page.js";

describe("Perfume Filters Tests", () => {
  it("See all new Perfumes", async () => {
    await Homepage.open();
    Homepage.waitForPageLoad();
    await Homepage.waitForLoaderToDisappear();
    await Homepage.gdprConsent(true);
    await TopMenu.navigateToSection(TopMenuSection.PERFUME);

    expect(await browser.getUrl()).toBe(
      "https://www.douglas.de/de/c/parfum/01"
    );
  });
});
