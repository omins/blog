import { allPosts } from "contentlayer/generated";
import PostList from "@/components/post-list";

export default async function Home() {
  return <PostList posts={allPosts} />;
}
