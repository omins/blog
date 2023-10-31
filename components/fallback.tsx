type Props = {
  children: React.ReactNode;
  title?: string;
};

export default function Fallback({
  children,
  title = "오류가 발생했어요 🥲",
}: Props) {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-8 px-4 py-[9rem] text-black dark:text-white">
      <h2 className=" whitespace-pre-line break-all text-center text-2xl font-bold">
        {title}
      </h2>
      <div className="flex flex-col items-center justify-center gap-4">
        {children}
      </div>
    </main>
  );
}
