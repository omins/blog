"use-client";

type Props = {
  onButtonClick: () => void;
  label?: string;
};

export default function Button({ onButtonClick, label = "Retry" }: Props) {
  return (
    <button
      className="mt-4 rounded-md bg-gray-300 px-6 py-2 text-xl font-bold text-gray-900"
      onClick={onButtonClick}
    >
      {label}
    </button>
  );
}
