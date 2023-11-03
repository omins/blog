import CategoryNav from "@/components/layout/category-nav";

type LayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <CategoryNav />
      {children}
    </>
  );
}
