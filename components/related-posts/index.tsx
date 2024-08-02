import { getRelatedPosts, hasMorePosts } from "@/lib/posts/related-posts";
import { Post } from "contentlayer/generated";
import PostCard from "../layout/post/post-card";
import ReadMore from "./read-more";

type Props = {
  currentPost: Post;
};

export default function RelatedPosts({ currentPost }: Props) {
  const { category } = currentPost;
  const relatedPosts = getRelatedPosts(currentPost);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="pb-4">
      <div className="my-8 px-4">
        <hr className="text-gray-400 dark:text-gray-500" />
      </div>
      <h2 className="mb-4 px-4 text-2xl font-bold text-black dark:text-white">
        Related Posts
      </h2>
      {relatedPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {hasMorePosts(currentPost) && <ReadMore category={category} />}
    </div>
  );
}
