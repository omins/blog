import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { getPages, isValidPage } from "@/lib/pages-utils";
import { getPosts } from "@/lib/posts";
import PaginatedPostList from "@/components/layout/paginated-list";

export const dynamicParams = false;

type Props = {
  params: {
    slug: string;
    id: string;
  };
};

export function generateStaticParams() {
  const params: { id: string }[] = [];
  const allPosts = getPosts();
  const totalPage = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  const pages = getPages(totalPage);

  pages.forEach((page) => {
    params.push({ id: page.toString() });
  });

  return params;
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const { id } = params;

  return {
    title: `Page - ${id}`,
    description: `OMIN's Blog Page ${id}`,
  };
}

export default function Page({ params }: Props) {
  const { id } = params;
  const pageNo = Number(id);

  if (pageNo === 1) {
    redirect(`/`);
  }

  const allPosts = getPosts();

  if (!isValidPage(pageNo, allPosts.length)) {
    notFound();
  }

  return (
    <PaginatedPostList
      allPosts={allPosts}
      pageNo={pageNo}
      pageType="main"
      category={null}
    />
  );
}
