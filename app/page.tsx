import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import PostCard from "@/components/post-card";

export default async function Home() {
  return (
    <div>
      {allPosts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
}
