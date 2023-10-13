import { POSTS_PER_PAGE } from "@/constants/posts";
import { renderCategoryPageLink, renderPageLink } from "@/lib/pages-utils";
import { Post } from "contentlayer/generated";
import Pagination from "@/components/pagination";
import PostList from "@/components/post-list";

type Props = {
  allPosts: Post[];
  pageNo: number;
  pageType: "category" | "main";
  category: string | null;
};

export default function PaginatedPostList(props: Props) {
  const { allPosts, pageNo, pageType, category } = props;

  const posts = allPosts.slice(
    (pageNo - 1) * POSTS_PER_PAGE,
    pageNo * POSTS_PER_PAGE,
  );

  return (
    <div>
      <PostList posts={posts} />
      <Pagination
        currentPage={pageNo}
        totalItems={allPosts.length}
        renderPageLink={(page) => {
          if (pageType === "category") {
            return renderCategoryPageLink(page, category!);
          }
          return renderPageLink(page);
        }}
      />
    </div>
  );
}
