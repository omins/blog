"use client";

import { useEffect } from "react";
import { ErrorProps } from "@/types/shared-layout";
import ErrorFallback from "@/components/layout/error-fallback";

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // TODO: Log error
    console.error(error);
  }, [error]);

  return <ErrorFallback onReset={reset} />;
}
