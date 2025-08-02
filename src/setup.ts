import '@testing-library/jest-dom/vitest';
import { expect, afterEach, beforeEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

beforeAll(() => {
    vi.stubGlobal('jest', {
        advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
    });
});

beforeEach(() => {
    vi.useFakeTimers();
});

afterAll(() => {
    vi.unstubAllGlobals();
});

afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    cleanup();
});
