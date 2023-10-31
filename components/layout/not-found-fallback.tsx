import Link from "next/link";
import Fallback from "../fallback";

type Props = {
  returnPath?: string;
  returnPathLabel?: string;
};
export default function NotFoundFallback({
  returnPath = "/",
  returnPathLabel = "홈으로",
}: Props) {
  return (
    <Fallback title={`404\n잘못된 접근입니다 🥲`}>
      <Link
        href={returnPath}
        className="text-xl font-bold text-green underline"
      >
        {returnPathLabel}
      </Link>
    </Fallback>
  );
}
