import { CATEGORY_ALL, CATEGORY_NAME_LABELS } from "@/constants/category";
import { getAllCategoriesWithCount } from "@/lib/posts";
import { getAllKeywords } from "..";

describe("getAllKeywords", () => {
  it("should return all keywords", () => {
    const categories = getAllCategoriesWithCount();
    const keywords = getAllKeywords();
    const expected = categories
      .filter((category) => category.name !== CATEGORY_ALL)
      .map((category) => CATEGORY_NAME_LABELS[category.name] || category.name);

    expect(keywords).toEqual(expected);
  });
});
