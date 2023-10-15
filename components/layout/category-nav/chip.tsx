export default function Chip({
  label,
  isSelected,
}: {
  label: string;
  isSelected: boolean;
}) {
  return (
    <div
      className={`whitespace-nowrap rounded-full px-2 py-1 text-sm font-semibold  ${
        isSelected
          ? "dark:bg-green bg-gray-800 text-white dark:text-white"
          : "dark:hover:bg-green bg-gray-100 text-gray-800 hover:bg-gray-800 hover:text-gray-200 dark:hover:text-white"
      }`}
    >
      <span>{label}</span>
    </div>
  );
}
