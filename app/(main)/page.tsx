import { getRootStructuredData } from "@/lib/metadata";
import { getPosts } from "@/lib/posts";
import JsonLd from "@/components/json-ld";
import PaginatedPostList from "@/components/layout/paginated-list";

export default async function Home() {
  const allPosts = getPosts();

  return (
    <>
      <JsonLd data={getRootStructuredData()} />
      <PaginatedPostList
        allPosts={allPosts}
        pageNo={1}
        pageType="main"
        category={null}
      />
    </>
  );
}
