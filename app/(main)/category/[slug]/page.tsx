import { Metadata } from "next";
import { CATEGORY_NAME_LABELS } from "@/constants/category";
import { BASE_OG, METADATA } from "@/lib/metadata";
import { getPosts } from "@/lib/posts";
import PaginatedPostList from "@/components/layout/paginated-list";

export const dynamicParams = false;

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug: category } = params;
  const allPosts = getPosts({ category });

  return (
    <PaginatedPostList
      allPosts={allPosts}
      pageNo={1}
      pageType="category"
      category={category}
    />
  );
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const { slug: category } = params;
  const { url: baseUrl, title: siteName } = METADATA;

  const categoryName = CATEGORY_NAME_LABELS[category] || category;
  const posts = getPosts({ category });

  const description = `${categoryName} 관련 ${posts.length}개의 글을 확인해보세요.`;
  const title = `OMIN's ${categoryName}`;

  return {
    // Using template for title declared in root layout
    title: `${categoryName}`,
    description,
    openGraph: {
      ...BASE_OG,
      title,
      description,
      url: `${baseUrl}/category/${category}`,
      images: [{ url: "/placeholder.png", alt: siteName }],
    },
  };
}

export function generateStaticParams() {
  const allPosts = getPosts();
  const categories = allPosts.map((post) => post.category);
  const uniqueCategories = Array.from(new Set(categories));
  const params = uniqueCategories.map((category) => ({ slug: category }));

  return params;
}
