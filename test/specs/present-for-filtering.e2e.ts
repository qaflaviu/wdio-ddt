import { expect } from "@wdio/globals";
import Homepage from "../pageobjects/homepage.page.js";
import PerfumesListingPage from "../pageobjects/perfumeslisting.page.js";
import TopMenu from "../pageobjects/topmenu.page.js";
import { TopMenuSection } from "../pageobjects/topmenu.page.js";
import PerfumeFilters, {
  PRESENT_FOR,
} from "../pageobjects/perfumefilters.page.js";
import { PRODUCT_STATE } from "../utils/enums.js";
import { TestData } from "../utils/testcases.js";

describe("Perfume Filters Tests", () => {
  const TestCases = [
    {
      presentFor: PRESENT_FOR.THANKS,
      totalItems: TestData.TOTAL_PRODUCTS,
      filteredItems: "81",
      onSaleItems: 18,
      newItems: 0,
      totalPage1: 45,
    },
    {
      presentFor: PRESENT_FOR.BIRTHDAY,
      totalItems: TestData.TOTAL_PRODUCTS,
      filteredItems: "576",
      onSaleItems: 29,
      newItems: 0,
      totalPage1: 46,
    },
  ];

  TestCases.forEach((testCase) => {
    it(`Validate filters for present for ${testCase.presentFor}`, async function () {
      await Homepage.open();
      await Homepage.waitForLoaderToDisappear();
      await Homepage.gdprConsent();
      await TopMenu.navigateToSection(TopMenuSection.PERFUME);

      expect(await PerfumesListingPage.getTotalProducts()).toBe(
        testCase.totalItems
      );
      await PerfumeFilters.openPresentFilter();
      await PerfumeFilters.selectFromPresentFor(testCase.presentFor);
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
