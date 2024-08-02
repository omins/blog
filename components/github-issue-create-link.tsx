import Link from "next/link";
import { DEFAULT_GITHUB_ISSUE_CREATE_URL } from "@/constants";

type Props = {
  url?: string;
  label?: string;
};

export default function GithubIssueCreateLink({
  url = DEFAULT_GITHUB_ISSUE_CREATE_URL,
  label = "Create an issue on GitHub",
}: Props) {
  return (
    <Link href={url} className="font-sm underline">
      {label}
    </Link>
  );
}
