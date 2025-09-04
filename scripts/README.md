# scripts/

This folder contains small maintenance scripts used by the project.

check-images.js
- Scans the repository for literal `/images/...` references in code and reports missing files in `public/`.
- Returns exit code 0 when all referenced images exist. Returns non-zero when missing images are detected (intended for CI).

Usage:

```bash
node scripts/check-images.js
```

CI:
- The GitHub Actions workflow runs this script as part of the `next-ci` job and will fail the build when missing images are found.
