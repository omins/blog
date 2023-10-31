"use client";

import { useEffect } from "react";
import Fallback from "@/components/layout/error-fallback";

export default function ErrorPage({
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

  return <Fallback onRetry={reset} />;
}
