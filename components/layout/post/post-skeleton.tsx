export default function PostSkeleton() {
  return (
    <div className="flex p-2">
      <div className="flex w-full flex-col gap-y-2">
        <div className="h-250pxr w-full animate-pulse overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-100"></div>
        <div className="flex flex-col items-start gap-y-1 px-1">
          <span className="font-regular w-20 animate-pulse rounded-full bg-gray-200 px-2 py-1 text-xs dark:bg-gray-100">
            &nbsp;
          </span>
          <h2 className="w-2/3 animate-pulse rounded-lg bg-gray-200 text-xl font-bold dark:bg-gray-100">
            &nbsp;
          </h2>
        </div>
      </div>
    </div>
  );
}
