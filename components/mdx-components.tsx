import Image, { ImageProps } from "next/image";
import { getBlurDataUrl, getStringSrc } from "@/lib/image-utils";
import { useMDXComponent } from "next-contentlayer/hooks";

async function RoundedImage(props: ImageProps) {
  const src = getStringSrc(props.src);
  const blurDataUrl = await getBlurDataUrl(src);

  return (
    <Image
      {...props}
      blurDataURL={blurDataUrl}
      placeholder="blur"
      className="image rounded-lg"
      alt={props?.alt || ""}
    />
  );
}

function Callout(props: { emoji: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center rounded bg-gray-200 p-1 px-4 py-4 text-sm text-gray-900  dark:border dark:border-gray-100 dark:bg-gray-700 dark:text-gray-200">
      <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  );
}

const components = {
  Image: (props: ImageProps) => <RoundedImage {...props} />,
  Callout,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
