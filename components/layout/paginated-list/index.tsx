import { POSTS_PER_PAGE } from "@/constants/posts";
import { renderCategoryPageLink, renderPageLink } from "@/lib/pages-utils";
import { Post } from "contentlayer/generated";
import Pagination from "@/components/layout/paginated-list/pagination";
import PostList from "@/components/layout/post/post-list";

type Props = {
  allPosts: Post[];
  pageNo: number;
  category: string | null;
};

export default function PaginatedPostList(props: Props) {
  const { allPosts, pageNo, category } = props;

  const start = (pageNo - 1) * POSTS_PER_PAGE;
  const end = pageNo * POSTS_PER_PAGE;

  const posts = allPosts.slice(start, end);

  return (
    <div>
      <PostList posts={posts} />
      <Pagination
        currentPage={pageNo}
        totalItems={allPosts.length}
        renderPageLink={(page) => {
          return category
            ? renderCategoryPageLink(page, category)
            : renderPageLink(page);
        }}
      />
    </div>
  );
}
