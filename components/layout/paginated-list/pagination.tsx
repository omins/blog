import Link from "next/link";
import React from "react";
import usePagination from "../../../hooks/usePagination";

type PaginationProps = {
  totalItems: number;
  currentPage: number;
  renderPageLink: (page: number) => string;
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
      {pages.map((page, i) =>
        page === dotts ? (
          <span
            key={i}
            className="rounded-full px-4 py-2 text-sm font-semibold text-black dark:text-white"
          >
            {page}
          </span>
        ) : (
          <Link
            key={i}
            href={renderPageLink(page as number)}
            className={`${
              page === currentPage
                ? "rounded-full border-2 border-green text-base font-semibold text-green"
                : "text-sm text-black dark:text-white"
            } mx-1 rounded-full px-3 py-1 font-semibold no-underline`}
          >
            {page}
          </Link>
        ),
      )}
    </div>
  );
}
