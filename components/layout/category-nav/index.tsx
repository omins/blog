"use client";

import { usePathname } from "next/navigation";
import { CATEGORY_ALL } from "@/constants/category";
import { getAllCategoriesWithCount } from "@/lib/posts-utils";
import CategoryChip from "@/components/layout/category-nav/category-chip";

export default function CategoryNav() {
  const pathname = usePathname();
  const currentCategoryName = getCategoryNameFromPath(pathname);
  const categories = getAllCategoriesWithCount();

  return (
    <div className="flex w-full flex-wrap items-center justify-start gap-2 p-2">
      {categories?.map((category) => (
        <CategoryChip
          key={category.name}
          currentCategoryName={currentCategoryName}
          name={category.name}
          count={category.count}
        />
      ))}
    </div>
  );
}

function getCategoryNameFromPath(pathname: string) {
  const regex = /pages|\/|category|\d+/g;
  const category = pathname.replace(regex, "");

  return category === "" ? CATEGORY_ALL : category;
}
