import { Post } from "contentlayer/generated";
import TagChip from "@/components/tag-chip";

type Props = {
  post: Post;
};

export default function PostHeader({ post }: Props) {
  const title = post.title;
  const publishedAt = post.publishedAt;
  const tags = post?.tags;
  const description = post?.description;

  return (
    <>
      <h1 className="mb-2">{title}</h1>
      {description && (
        <p className="mt-0 text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}

      <div className="flex flex-col flex-wrap items-end gap-2">
        <span className="font-regular text-xs text-gray-600 dark:text-white">
          {publishedAt}
        </span>
        <div className="flex flex-wrap justify-end gap-2">
          {tags &&
            tags?.map((tag) => {
              return <TagChip key={tag} label={tag} />;
            })}
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
}
