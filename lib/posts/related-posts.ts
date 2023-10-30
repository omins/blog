import { RELATED_POSTS_LIMIT } from "@/constants/posts";
import { Post } from "contentlayer/generated";
import { getPosts } from ".";

export function getRelatedPosts(currentPost: Post): Post[] {
  const posts = getPostsFilteredGivenPost(currentPost);

  return posts.slice(0, RELATED_POSTS_LIMIT);
}

export function hasMorePosts(currentPost: Post) {
  const posts = getPostsFilteredGivenPost(currentPost);

  if (posts.length > 4) {
    return true;
  }

  return false;
}

export function getPostsFilteredGivenPost(currentPost: Post) {
  const { _id, category } = currentPost;

  const allPosts = getPosts({ category });
  const filteredPosts = allPosts.filter((post) => post._id !== _id);

  return filteredPosts;
}
