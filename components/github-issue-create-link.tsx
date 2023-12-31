import Link from "next/link";
import { DEFAULT_GITHUB_ISSUE_CREATE_URL } from "@/constants";

type Props = {
  url?: string;
  label?: string;
};

export default function GithubIssueCreateLink({
  url = DEFAULT_GITHUB_ISSUE_CREATE_URL,
  label = "제보하기",
}: Props) {
  return (
    <Link href={url} className="font-sm underline">
      {label}
    </Link>
  );
}
