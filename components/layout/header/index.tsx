import Link from "next/link";
import Logo from "@/components/icons/logo";
import ModeToggle from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-[99] flex items-center justify-between bg-white p-6 dark:bg-black">
      <Link href="/">
        <Logo className="fill-black dark:fill-white" />
      </Link>
      <ModeToggle />
    </header>
  );
}
