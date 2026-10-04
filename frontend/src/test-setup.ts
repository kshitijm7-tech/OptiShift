import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Vitest runs without injected globals, so React Testing Library cannot
// auto-register cleanup: unmount every render between tests explicitly.
afterEach(() => {
  cleanup();
});
