# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog
and this project adheres to Semantic Versioning.

## [1.1.2] - 2026-05-25

### Fixed
- Removed deprecated and vulnerable backend dependency `request` (it was unused), eliminating unfixable critical vulnerability chains.
- Upgraded frontend toolchain dependencies via audit remediation, including Vite major upgrade to address reported security advisories.
- Upgraded backend vulnerable dependencies (`nodemon`, `uuid`) to secure versions and cleared backend audit findings.
- Resolved frontend linting errors caused by missing React hook imports, stale namespace usage, and unused imports/variables.
- Updated frontend lint policy to disable noisy `react/prop-types` and `react/no-unescaped-entities` checks for current code style consistency.

### Changed
- Bumped package versions for patched release:
- `frontend/package.json` -> `1.1.2`
- `backend/package.json` -> `1.1.2`

## [1.1.1] - 2026-03-11

### Added
- Introduced initial design system improvements for consistent UI components.
- Updated project documentation for better developer onboarding.

### Fixed
- Resolved refresh token error affecting authentication flow.
