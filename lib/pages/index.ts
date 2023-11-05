type PageInfo = {
  pageNo: number;
  category: string | null;
};

export function getPageInfoFromSlugs(slugs: string[]): PageInfo {
  const pageInfo = { pageNo: 1, category: null } as PageInfo;

  if (slugs.length < 2) return pageInfo;

  if (slugs.includes("category")) {
    const categorySlugs = slugs.slice(0, 2);
    const pagesSlugs = slugs.slice(2);

    pageInfo.category = categorySlugs[1] || null;
    pageInfo.pageNo = Number(pagesSlugs[1]) || 1;
  } else if (slugs.includes("pages")) {
    pageInfo.pageNo = Number(slugs[1]) || 1;
  }

  return pageInfo;
}
