import { getAllCategoriesWithCount } from "@/lib/post";
import CategoryChip from "@/components/category-chip";

type LayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: LayoutProps) {
  const categories = getAllCategoriesWithCount();

  return (
    <div>
      <div className="flex w-full flex-wrap items-center justify-start gap-2 p-2">
        {categories?.map((category) => (
          <CategoryChip category={category} key={category.name} />
        ))}
      </div>
      {children}
    </div>
  );
}
