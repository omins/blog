import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CATEGORY_ALL, CATEGORY_NAME_LABELS } from "@/constants/category";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { getPages, isValidPage } from "@/lib/pages-utils";
import {
  getAllCategoriesWithCount,
  getPostsByCategory,
} from "@/lib/posts-utils";
import PaginatedPostList from "@/components/layout/paginated-list";

export const dynamicParams = false;

type Props = {
  params: {
    slug: string;
    id: string;
  };
};

export function generateStaticParams() {
  const categoriesWithCount = getAllCategoriesWithCount();

  const params: { slug: string; id: string }[] = [];

  categoriesWithCount.forEach((category) => {
    if (category.name === CATEGORY_ALL) return;
    const totalPage = Math.ceil(category.count / POSTS_PER_PAGE);
    const pages = getPages(totalPage);

    pages.forEach((page) => {
      params.push({ slug: category.name, id: page.toString() });
    });
  });

  return params;
}

export function generateMetadata({
  params,
}: {
  params: { slug: string; id: string };
}): Metadata {
  const { slug, id } = params;
  const categoryName = CATEGORY_NAME_LABELS[slug];

  return {
    title: `${categoryName} - Page ${id}`,
    description: `${categoryName} 관련 글을 확인해보세요.`,
  };
}

export default function Page({ params }: Props) {
  const { slug: category, id } = params;
  const pageNo = Number(id);
  const allPosts = getPostsByCategory(category);

  if (pageNo === 1) {
    redirect(`/category/${category}`);
  }

  if (!isValidPage(pageNo, allPosts.length)) {
    notFound();
  }

  return (
    <PaginatedPostList
      allPosts={allPosts}
      pageNo={pageNo}
      pageType="category"
      category={category}
    />
  );
}
