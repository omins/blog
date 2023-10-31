import RetryButton from "@/components/button";
import Fallback from "@/components/fallback";
import GithubIssueCreateLink from "@/components/github-issue-create-link";

export default function ErrorFallback({ onReset }: { onReset: () => void }) {
  return (
    <Fallback>
      <RetryButton onButtonClick={onReset} />
      <GithubIssueCreateLink />
    </Fallback>
  );
}
