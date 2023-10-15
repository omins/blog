import { POSTS_PER_PAGE } from "@/constants/posts";
import { getPages } from "@/lib/pages-utils";
import { dotts } from "@/components/layout/paginated/pagination";

export default function usePagination(totalItems: number, currentPage: number) {
  const totalPages = Math.ceil(totalItems / POSTS_PER_PAGE);

  // -> 1 2 3 4 5
  if (totalPages <= 5) {
    return getPages(totalPages);
  }
  // -> 1 2 3 4 ... 10
  if (currentPage <= 3) {
    return [1, 2, 3, 4, dotts, totalPages];
  }
  // -> 1 ... 4 5 6 ... 10
  if (currentPage < totalPages - 2) {
    return [
      1,
      dotts,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      dotts,
      totalPages,
    ];
  }
  // -> 1 ... 7 8 9 10
  return [1, dotts, ...getPages(4, totalPages - 3)];
}
