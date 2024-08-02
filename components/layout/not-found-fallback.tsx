import Link from "next/link";
import Fallback from "../fallback";

type Props = {
  returnPath?: string;
  returnPathLabel?: string;
};
export default function NotFoundFallback({
  returnPath = "/",
  returnPathLabel = "Home",
}: Props) {
  return (
    <Fallback title={`404\nNot found 🥲`}>
      <Link
        href={returnPath}
        className="text-xl font-bold text-green underline"
      >
        {returnPathLabel}
      </Link>
    </Fallback>
  );
}
