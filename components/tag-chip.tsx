export default function TagChip({ label }: { label: string }) {
  return (
    <span
      className={`whitespace-nowrap rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-800 `}
    >
      {label}
    </span>
  );
}
