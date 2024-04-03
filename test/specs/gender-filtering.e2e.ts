import { expect } from "@wdio/globals";
import Homepage from "../pageobjects/homepage.page.js";
import PerfumesListingPage from "../pageobjects/perfumeslisting.page.js";
import TopMenu from "../pageobjects/topmenu.page.js";
import { TopMenuSection } from "../pageobjects/topmenu.page.js";
import PerfumeFilters, { GENDER } from "../pageobjects/perfumefilters.page.js";
import { PRODUCT_STATE } from "../utils/enums.js";

describe("Perfume Filters Tests", () => {
  const TestCases = [
    {
      gender: GENDER.MAN,
      totalItems: "6.105",
      filteredItems: "1.288",
      onSaleItems: 27,
      newItems: 6,
      totalPage1: 45,
    },
    {
      gender: GENDER.UNISEX,
      totalItems: "6.105",
      filteredItems: "3.184",
      onSaleItems: 15,
      newItems: 6,
      totalPage1: 46,
    },
  ];

  TestCases.forEach((testCase) => {
    it(`Validate filters for gender ${testCase.gender}`, async function () {
      await Homepage.open();
      await Homepage.waitForLoaderToDisappear();
      await Homepage.gdprConsent();
      await TopMenu.navigateToSection(TopMenuSection.PERFUME);

      expect(await PerfumesListingPage.getTotalProducts()).toBe(
        testCase.totalItems
      );
      await PerfumeFilters.openGenderFilter();
      await PerfumeFilters.selectFromDropdown(testCase.gender);
      await PerfumeFilters.clickSearchButton();
      await PerfumeFilters.waitForSearchToFinish();

      expect(await PerfumesListingPage.getListedProductsCount()).toBe(
        testCase.totalPage1
      );
      expect(
        await PerfumesListingPage.getProductPromos(PRODUCT_STATE.SALE)
      ).toBe(testCase.onSaleItems);
      expect(
        await PerfumesListingPage.getProductPromos(PRODUCT_STATE.NEW)
      ).toBe(testCase.newItems);
      expect(await PerfumesListingPage.getTotalProducts()).toBe(
        testCase.filteredItems
      );
    });
  });
});
