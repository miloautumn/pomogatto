import { describe, test, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Stopwatch from './Stopwatch';
import userEvent, { type UserEvent } from '@testing-library/user-event';

describe('Stopwatch', () => {
    let user: UserEvent;

    beforeEach(() => {
        act(() => {
            render(<Stopwatch />);
        });

        user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    });

    test('starts stopwatch', async () => {
        const startPauseButton = screen.getByTestId('start-pause-button');
        await act(async () => {
            await user.click(startPauseButton);
            vi.advanceTimersByTime(1000);
        });

        expect(screen.getByText('00:00:01')).toBeDefined();
        expect(startPauseButton.textContent).toBe('pause');
        await act(async () => {
            await user.click(startPauseButton);
        });
    });

    test('pauses stopwatch', async () => {
        const startPauseButton = screen.getByTestId('start-pause-button');
        await act(async () => {
            await user.click(startPauseButton);
            vi.advanceTimersByTime(2000);
            await user.click(startPauseButton);
        });

        expect(screen.getByText('00:00:02')).toBeDefined();
        expect(startPauseButton.textContent).toBe('start');
    });

    test('reset stopwatch', async () => {
        const startPauseButton = screen.getByTestId('start-pause-button');
        const resetButton = screen.getByTestId('reset-button');
        await act(async () => {
            await user.click(startPauseButton);
            vi.advanceTimersByTime(1000);
        });

        expect(startPauseButton.textContent).toBe('pause');
        expect(screen.getByText('00:00:01')).toBeDefined();

        await act(async () => {
            await user.click(resetButton);
        });
        expect(screen.getByText('00:00:00')).toBeDefined();
    });

    test('displays minutes after 60 or more seconds have elapsed', async () => {
        const startPauseButton = screen.getByTestId('start-pause-button');
        await act(async () => {
            await user.click(startPauseButton);
            vi.advanceTimersByTime(61 * 1000); // advance timer by 61 seconds
        });
        expect(screen.getByText('00:01:01')).toBeDefined();
        expect(startPauseButton.textContent).toBe('pause');
    });
});
