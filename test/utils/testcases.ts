import { CLASSIFICATIONS } from "../pageobjects/perfumefilters.page";

export class ClassificationTestData {
  static readonly TestCases = [
    {
      classification: CLASSIFICATIONS.EAU_DE_PARFUM,
      totalItems: "6.100",
      filteredItems: "3.070",
      onSaleItems: 15,
      newItems: 17,
      totalPage1: 46,
    },
    {
      classification: CLASSIFICATIONS.EAU_DE_TOILETTE,
      totalItems: "6.100",
      filteredItems: "1.162",
      onSaleItems: 26,
      newItems: 5,
      totalPage1: 46,
    },
  ];
}
