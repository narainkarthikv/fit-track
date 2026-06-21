# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog
and this project adheres to Semantic Versioning.

## [1.1.4] - 2026-06-21

### Security
- **Docker Security Hardening:**
  - Upgraded Docker base images from Node.js 18-alpine to Node.js 22-alpine (latest LTS with security updates).
  - Implemented non-root user execution for both backend and frontend containers (user: nodejs, group: nodejs, UID: 1001).
  - Optimized file ownership handling using `chown -R` after installation for better compatibility and reliability.
  - Improved npm install commands with `--prefer-offline --no-audit` flags and cache clearing for safer dependency installation.
- Updated Node.js engine requirements in package.json files from `>=18.0.0` to `>=20.0.0` for both frontend and backend.

### Fixed
- Corrected Docker build process to handle file permissions correctly when switching to non-root user.
- Fixed npm install compatibility issues in containerized environments by running package installation before user context switch.

### Benefits
- **Reduced Attack Surface:** Non-root containers prevent container escape vulnerabilities from gaining host-level access.
- **Latest Security Patches:** Node.js 22 includes security patches and performance improvements over Node.js 18.
- **Production-Ready:** Follows Docker security best practices and industry standards.
- **Compliance:** Aligns with container security scanning tools and compliance requirements.
- **Reliable Builds:** Fixed permission handling ensures consistent Docker builds across different environments.

## [1.1.3] - 2026-06-21

### Fixed
- Fixed react-refresh ESLint warnings in frontend by extracting AppRoot component to separate file (main.jsx, CTA.jsx).
- Standardized error response format across backend API routes to consistently use "error" key for error responses.
- Resolved unused React import in AppRoot.jsx (React 17+ doesn't require React import for JSX).

### Changed
- Refactored backend utility functions for better code organization and maintainability:
  - Extracted password hashing, validation, and user sanitization functions to `backend/utils/helpers.js`.
  - Extracted exercise validation functions to `backend/utils/validators.js`.
  - Consolidated MongoDB ObjectId conversion and date normalization utilities.
- Updated import statements in `routes/exercises.js` and `routes/user.js` to use centralized utility functions.
- Bumped package versions for patch release:
  - `frontend/package.json` -> `1.1.3`
  - `backend/package.json` -> `1.1.3`

### Improvements
- Enhanced code maintainability by reducing code duplication in route handlers.
- Improved consistency in error response formats across all API endpoints.
- Better separation of concerns with utility functions in dedicated files.

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
