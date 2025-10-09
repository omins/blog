# CI Workflow Guide

## Local Checks

- `yarn install` ensures dependencies resolve with Yarn 4
- `yarn check` validates Astro content collections and TypeScript types
- `yarn test --run` executes Vitest once
- `yarn build` compiles the static site

## GitHub Actions Example

```yaml
name: astro-ci

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: yarn
      - run: corepack enable
      - run: yarn install --immutable
      - run: yarn check
      - run: yarn test --run
      - run: yarn build
        env:
          DEFAULT_LOCALE: ko
          SUPPORTED_LOCALES: ko,en
```

## Tips

- Pin `node-version` to match local development for reproducible builds
- Surface migration scripts as optional steps by adding a matrix entry that runs `yarn content:migrate --dry-run`
- Use `DEFAULT_LOCALE` and `SUPPORTED_LOCALES` environment variables for any job that renders localized content
