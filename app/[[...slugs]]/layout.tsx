import { getRootStructuredData } from "@/lib/metadata";
import JsonLd from "@/components/json-ld";
import CategoryNav from "@/components/layout/category-nav";

type LayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <JsonLd data={getRootStructuredData()} />
      <CategoryNav />
      {children}
    </>
  );
}
