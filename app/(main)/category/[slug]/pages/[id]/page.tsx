import { notFound, redirect } from "next/navigation";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { isValidPage } from "@/lib/pages-utils";
import { getPostsByCategory } from "@/lib/posts-utils";
import PaginatedPostList from "@/components/layout/paginated";

export const dynamicParams = false;

type Props = {
  params: {
    slug: string;
    id: string;
  };
};

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
