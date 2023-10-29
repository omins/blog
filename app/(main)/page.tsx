import { getPosts } from "@/lib/posts";
import PaginatedPostList from "@/components/layout/paginated-list";

export default async function Home() {
  const allPosts = getPosts();

  return (
    <PaginatedPostList
      allPosts={allPosts}
      pageNo={1}
      pageType="main"
      category={null}
    />
  );
}
