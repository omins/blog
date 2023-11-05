import { getPageInfoFromSlugs } from "..";

describe("getPageInfoFromSlugs", () => {
  const testCases = [
    {
      slugs: [],
      expected: { pageNo: 1, category: null },
      description: "should return info of root",
    },
    {
      slugs: ["category", "web"],
      expected: { pageNo: 1, category: "web" },
      description: "should return info of category page",
    },
    {
      slugs: ["pages", "2"],
      expected: { pageNo: 2, category: null },
      description: "should return info of root with page id",
    },
    {
      slugs: ["category", "web", "pages", "2"],
      expected: { pageNo: 2, category: "web" },
      description: "should return info of category page with page id",
    },
    {
      slugs: ["category", "pages", "pages", "2"],
      expected: { pageNo: 2, category: "pages" },
      description: "should return info when category is 'pages'",
    },
    {
      slugs: ["category", "category"],
      expected: { pageNo: 1, category: "category" },
      description: "should return info when category is 'category'",
    },
    {
      slugs: ["category"],
      expected: { pageNo: 1, category: null },
      description: "should return default when category not provided",
    },
    {
      slugs: ["pages"],
      expected: { pageNo: 1, category: null },
      description: "should return default when page id not provided",
    },
    {
      slugs: ["category", "web", "pages"],
      expected: { pageNo: 1, category: "web" },
      description:
        "should return default when category provided but page id not provided",
    },
  ];

  testCases.forEach((testCase) => {
    it(testCase.description, () => {
      const pageInfo = getPageInfoFromSlugs(testCase.slugs);
      expect(pageInfo).toEqual(testCase.expected);
    });
  });
});
