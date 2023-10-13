import Link from "next/link";
import React from "react";
import usePagination from "../hooks/usePagination";

export type PaginationProps = {
  totalItems: number;
  currentPage: number;
  renderPageLink: (page: number) => string;
  itemsPerPage?: number;
};

export const dotts = "...";

export default function Pagination({
  totalItems,
  currentPage,
  renderPageLink,
}: PaginationProps) {
  const pages = usePagination(totalItems, currentPage);

  return (
    <div className="my-8 flex items-center justify-center">
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span
            key={i}
            className="rounded-full px-4 py-2 text-sm font-semibold text-black dark:text-white"
          >
            {pageNumber}
          </span>
        ) : (
          <Link
            key={i}
            href={renderPageLink(pageNumber as number)}
            className={`${
              pageNumber === currentPage
                ? "text-green"
                : "text-black dark:text-white"
            } mx-1 rounded-full px-4 py-2 text-sm font-semibold no-underline`}
          >
            {pageNumber}
          </Link>
        ),
      )}
    </div>
  );
}
