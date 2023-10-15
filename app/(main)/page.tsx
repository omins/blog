import { allPosts } from "contentlayer/generated";
import PaginatedPostList from "@/components/layout/paginated-list";

export default async function Home() {
  return (
    <PaginatedPostList
      allPosts={allPosts}
      pageNo={1}
      pageType="main"
      category={null}
    />
  );
}
