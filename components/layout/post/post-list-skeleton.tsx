import { POSTS_PER_PAGE } from "@/constants/posts";
import PostSkeleton from "./post-skeleton";

export default function PostListSkeleton() {
  return (
    <div>
      {Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}
