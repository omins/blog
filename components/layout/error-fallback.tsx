import RetryButton from "@/components/button";
import Fallback from "@/components/fallback";
import GithubIssueCreateLink from "@/components/github-issue-create-link";

type Props = {
  onReset: () => void;
};

export default function ErrorFallback({ onReset }: Props) {
  return (
    <Fallback>
      <RetryButton onButtonClick={onReset} />
      <GithubIssueCreateLink />
    </Fallback>
  );
}
