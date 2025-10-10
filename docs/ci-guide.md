# CI/CD Guide

## Playwright E2E Tests

### Workflow Overview

The GitHub Actions workflow (`.github/workflows/playwright.yml`) runs on:

- Pull requests targeting `main`
- Pushes to `main`

### Workflow Steps

1. **Environment Setup**
   - Uses Node.js 22 from `.nvmrc`
   - Enables Corepack for package manager support
   - Installs pnpm via `pnpm/action-setup@v4` using `packageManager` field from `package.json`

2. **Caching**
   - pnpm store cache: Speeds up dependency installation
   - Playwright browsers cache: Avoids re-downloading Chromium on every run

3. **Dependencies**
   - Runs `pnpm install --frozen-lockfile` for reproducible builds

4. **Testing**
   - Executes `pnpm run test:e2e` which:
     - Builds the site (`pnpm run build`)
     - Runs Playwright tests in headless Chromium

### Configuration

The workflow respects these settings:

- Timeout: 10 minutes
- Browser: Chromium only (for CI performance)
- Base URL: `http://127.0.0.1:4321` (configurable via `PLAYWRIGHT_BASE_URL`)

### Local Testing

Run the same tests locally:

```bash
# Full e2e suite (builds first)
pnpm run test:e2e

# Interactive UI mode
pnpm run test:e2e:ui

# Debug mode with inspector
pnpm run test:e2e:debug

# Headed mode (see browser)
pnpm run test:e2e:headed

# Slow motion for debugging
pnpm run test:e2e:slow
```

### Test Coverage

Current e2e tests verify:

- Root redirects to default locale
- Locale switching from posts listing
- Tag detail page navigation
- Theme persistence through toggle

### Troubleshooting

**Failed builds**: Check `pnpm run check` and `pnpm run lint` locally first

**Flaky tests**: Run with `pnpm run test:e2e:headed` to observe browser behavior

**Cache issues**: Clear GitHub Actions caches from repository settings
