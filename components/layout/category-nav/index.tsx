import { CATEGORY_ALL } from "@/constants/category";
import { getAllCategoriesWithCount } from "@/lib/posts";
import CategoryChip from "@/components/layout/category-nav/category-chip";

export default function CategoryNav() {
  const categories = getAllCategoriesWithCount();

  return (
    <div className="flex w-full flex-wrap items-center justify-start gap-2 p-2">
      {categories?.map((category) => (
        <CategoryChip
          key={category.name}
          name={category.name}
          count={category.count}
        />
      ))}
    </div>
  );
}
