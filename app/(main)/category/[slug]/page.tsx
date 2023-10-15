import { Metadata } from "next";
import { CATEGORY_NAME_LABELS } from "@/constants/category";
import { getPostsByCategory } from "@/lib/posts-utils";
import { allPosts } from "contentlayer/generated";
import PaginatedPostList from "@/components/layout/paginated-list";

export const dynamicParams = false;

export function generateStaticParams() {
  const categories = allPosts.map((post) => post.category);
  const uniqueCategories = Array.from(new Set(categories));
  const params = uniqueCategories.map((category) => ({ slug: category }));

  return params;
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const { slug } = params;
  const categoryName = CATEGORY_NAME_LABELS[slug];

  const posts = getPostsByCategory(slug);

  return {
    title: `${categoryName}`,
    description: `${categoryName} 관련 ${posts.length}개의 글을 확인해보세요.`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug: category } = params;
  const allPosts = getPostsByCategory(category);

  return (
    <PaginatedPostList
      allPosts={allPosts}
      pageNo={1}
      pageType="category"
      category={category}
    />
  );
}
