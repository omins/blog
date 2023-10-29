import Link from "next/link";
import { CATEGORY_NAME_LABELS } from "@/constants/category";

export default function ReadMore({ category }: { category: string }) {
  return (
    <div className="flex w-full items-center justify-center py-4">
      <Link href={`/category/${category}`}>
        <div className="rounded-lg bg-gray-200 px-3 py-1 dark:bg-gray-800">
          <span className="text-lg font-bold text-gray-900 dark:text-green">
            {CATEGORY_NAME_LABELS[category]} 관련 글 더 보기
          </span>
        </div>
      </Link>
    </div>
  );
}
