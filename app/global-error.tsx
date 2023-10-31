"use client";

import { useEffect } from "react";
import ErrorFallback from "@/components/layout/error-fallback";

/**
 * FIXME: Currently, the global-error.tsx is not catching the error thrown by root layout.
 * next version: 13.5.4.
 * https://github.com/vercel/next.js/issues/52993
 */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: Log error
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <ErrorFallback onReset={reset} />
      </body>
    </html>
  );
}
