import { POSTS_PER_PAGE } from "@/constants/posts";

export function isValidPage(pageNo: number, totalLengthOfPosts: number) {
  return (
    !isNaN(pageNo) &&
    !(pageNo > Math.ceil(totalLengthOfPosts / POSTS_PER_PAGE)) &&
    !(pageNo < 1)
  );
}

export function renderCategoryPageLink(pageNo: number, slug: string) {
  if (pageNo === 1) return `/category/${slug}`;
  return `/category/${slug}/pages/${pageNo}`;
}

export function renderPageLink(pageNo: number) {
  if (pageNo === 1) return "/";
  return `/pages/${pageNo}`;
}

export const getPages = (length: number, inc: number = 1) =>
  Array.from({ length }, (_, i) => i + inc);
