import Link from "next/link";
import { Post } from "@/.contentlayer/generated";
import { DEFAULT_IMAGE_URL } from "@/constants";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <Link href={post.url_path} className="flex p-2">
      <div className="group relative flex w-full flex-col gap-y-2 text-black dark:text-white">
        <div className="h-250pxr absolute left-0 right-0 top-0 z-10 flex w-full flex-col items-start justify-between rounded-lg bg-black p-2 opacity-0 transition delay-100 ease-in-out group-hover:opacity-70">
          <span className="rounded-full border px-2 py-1 text-sm font-semibold text-white">
            {post.category}
          </span>
          {post?.description ? (
            <p className="font-regular break-words text-sm text-white">
              {post.description}
            </p>
          ) : null}
        </div>
        <img
          src={post?.image || DEFAULT_IMAGE_URL}
          alt={post.title}
          className="h-250pxr w-full rounded-lg object-cover"
          loading="lazy"
        />
        <div className="flex flex-col items-start gap-y-1 px-1">
          <span className="font-regular rounded-full border px-2 py-1 text-xs">
            {post.publishedAt.replaceAll("-", "/")}
          </span>
          <h2 className="text-xl font-bold">{post.title}</h2>
        </div>
      </div>
    </Link>
  );
}
