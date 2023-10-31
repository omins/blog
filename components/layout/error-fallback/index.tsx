import Link from "next/link";
import { DEFAULT_GITHUB_ISSUE_CREATE_URL } from "@/constants";

type Props = {
  onRetry: () => void;
  title?: string;
  retryButtonLabel?: string;
  issueLinkLabel?: string;
  githubIssueCreateUrl?: string;
};

export default function Fallback({
  onRetry,
  title = "오류가 발생했어요 🥲",
  retryButtonLabel = "다시 시도",
  issueLinkLabel = "제보하기",
  githubIssueCreateUrl = DEFAULT_GITHUB_ISSUE_CREATE_URL,
}: Props) {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-8 px-4 py-[9rem] text-black dark:text-white">
      <h2 className=" whitespace-pre-line break-all text-center text-2xl font-bold">
        {title}
      </h2>
      <div className="flex flex-col items-center justify-center gap-4">
        <button
          className="mt-4 rounded-md bg-gray-300 px-6 py-2 text-xl font-bold text-gray-900 transition-colors"
          onClick={() => onRetry()}
        >
          {retryButtonLabel}
        </button>
        <Link href={githubIssueCreateUrl} className="font-sm underline">
          {issueLinkLabel}
        </Link>
      </div>
    </main>
  );
}
