import { expect } from "@wdio/globals";
import Homepage from "../pageobjects/homepage.page.js";
import PerfumesListingPage from "../pageobjects/perfumeslisting.page.js";
import TopMenu from "../pageobjects/topmenu.page.js";
import { TopMenuSection } from "../pageobjects/topmenu.page.js";
import PerfumeFilters, {
  CLASSIFICATIONS,
} from "../pageobjects/perfumefilters.page.js";
import { PRODUCT_STATE } from "../utils/enums.js";
import { TestData } from "../utils/testcases.js";

describe("Perfume Filters Tests", () => {
  const TestCases = [
    {
      classification: CLASSIFICATIONS.EAU_DE_PARFUM,
      totalItems: TestData.TOTAL_PRODUCTS,
      filteredItems: "2.975",
      onSaleItems: 24,
      newItems: 16,
      totalPage1: 46,
    },
    {
      classification: CLASSIFICATIONS.EAU_DE_TOILETTE,
      totalItems: TestData.TOTAL_PRODUCTS,
      filteredItems: "1.148",
      onSaleItems: 28,
      newItems: 4,
      totalPage1: 46,
    },
  ];

  TestCases.forEach((testCase) => {
    it(`Validate filters for classification ${testCase.classification}`, async function () {
      await Homepage.open();
      await Homepage.waitForLoaderToDisappear();
      await Homepage.gdprConsent();
      await TopMenu.navigateToSection(TopMenuSection.PERFUME);

      expect(await PerfumesListingPage.getTotalProducts()).toBe(
        testCase.totalItems
      );
      await PerfumeFilters.openClassificationFilter();
      await PerfumeFilters.selectFromClassification(testCase.classification);
      await PerfumeFilters.clickSearchButton();
      await PerfumeFilters.waitForSearchToFinish();

      (await PerfumesListingPage.getResultsCategories()).forEach(async (text) =>
        expect(text).toBe(testCase.classification)
      );

      expect(await PerfumesListingPage.getListedProductsCount()).toBe(
        testCase.totalPage1
      );
      expect(
        await PerfumesListingPage.getProductPromos(PRODUCT_STATE.SALE)
      ).toBeGreaterThanOrEqual(testCase.onSaleItems);
      expect(
        await PerfumesListingPage.getProductPromos(PRODUCT_STATE.NEW)
      ).toBeGreaterThanOrEqual(testCase.newItems);
      expect(await PerfumesListingPage.getTotalProducts()).toBe(
        testCase.filteredItems
      );
    });
  });
});
