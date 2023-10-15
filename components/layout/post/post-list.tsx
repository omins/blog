import { Post } from "contentlayer/generated";
import PostCard from "./post-card";

type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  return (
    <div>{posts?.map((post) => <PostCard post={post} key={post._id} />)}</div>
  );
}
