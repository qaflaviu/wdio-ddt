import { expect } from "@wdio/globals";
import Homepage from "../pageobjects/homepage.page.js";
import PerfumesListingPage from "../pageobjects/perfumeslisting.page.js";
import TopMenu from "../pageobjects/topmenu.page.js";
import { TopMenuSection } from "../pageobjects/topmenu.page.js";
import PerfumeFilters, { BRANDS } from "../pageobjects/perfumefilters.page.js";
import { PRODUCT_STATE } from "../utils/enums.js";
import { TestData } from "../utils/testcases.js";

describe("Perfume Filters Tests", () => {
  const TestCases = [
    {
      brand: BRANDS.AC,
      totalItems: TestData.TOTAL_PRODUCTS,
      filteredItems: "27",
      onSaleItems: 19,
      newItems: 2,
      totalPage1: 27,
    },
    {
      brand: BRANDS.A_AND_F,
      totalItems: TestData.TOTAL_PRODUCTS,
      filteredItems: "21",
      onSaleItems: 21,
      newItems: 0,
      totalPage1: 21,
    },
  ];

  TestCases.forEach((testCase) => {
    it(`Validate filters for brand ${testCase.brand}`, async function () {
      await Homepage.open();
      await Homepage.waitForLoaderToDisappear();
      await Homepage.gdprConsent();
      await TopMenu.navigateToSection(TopMenuSection.PERFUME);

      expect(await PerfumesListingPage.getTotalProducts()).toBe(
        testCase.totalItems
      );
      await PerfumeFilters.openBrandFilter();
      await PerfumeFilters.selectFromBrand(testCase.brand);
      await PerfumeFilters.clickSearchButton();
      await PerfumeFilters.waitForSearchToFinish();

      (await PerfumesListingPage.getResultsBrand()).forEach(async (text) =>
        expect(text).toBe(testCase.brand)
      );

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
