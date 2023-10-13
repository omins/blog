import { notFound, redirect } from "next/navigation";
import { allPosts } from "@/.contentlayer/generated";
import { isValidPage } from "@/lib/pages-utils";
import PaginatedPostList from "@/components/layout/paginated";

export const dynamicParams = false;

type Props = {
  params: {
    slug: string;
    id: string;
  };
};

export default function Page({ params }: Props) {
  const { id } = params;
  const pageNo = Number(id);

  if (pageNo === 1) {
    redirect(`/`);
  }

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
