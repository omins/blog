export const env =
  process.env.NEXT_PUBLIC_CONFIG_ENV ??
  process.env.CONFIG_ENV ??
  process.env.NODE_ENV;

export const isProduction = env === "production";
