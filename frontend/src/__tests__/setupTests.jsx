// frontend/src/__tests__/setupTests.js
import '@testing-library/jest-dom';
import '@testing-library/react';
import { vi } from 'vitest';

// Mock react-lottie to avoid Lottie errors in jsdom
vi.mock('react-lottie', () => {
  return {
    // eslint-disable-next-line no-unused-vars
    default: (props) => <div data-testid="lottie-mock" />,
  };
});

// Optional global fetch mock
globalThis.fetch =
  globalThis.fetch ||
  (() => Promise.resolve({ json: () => Promise.resolve({}) }));
