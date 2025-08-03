import { describe, test, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Stopwatch from './Stopwatch';
import userEvent, { type UserEvent } from '@testing-library/user-event';

describe('Stopwatch', () => {
    let user: UserEvent;
    let startButton: HTMLElement;
    let stopButton: HTMLElement;
    let resetButton: HTMLElement;

    beforeEach(() => {
        act(() => {
            render(<Stopwatch />);
        });

        user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        startButton = screen.getByTestId('start-button');
        stopButton = screen.getByTestId('stop-button');
        resetButton = screen.getByTestId('reset-button');
    });

    test('starts stopwatch', async () => {
        await act(async () => {
            await user.click(startButton);
            vi.advanceTimersByTime(1000);
            await user.click(stopButton);
        });

        expect(screen.getByText('00:00:01')).toBeDefined();
    });

    test('cannot double click start button', async () => {
        await act(async () => {
            await user.click(startButton);
            vi.advanceTimersByTime(1000);
        });
        expect(startButton).toBeDisabled();
        await user.click(stopButton);
    });

    test('stops stopwatch', async () => {
        await act(async () => {
            await user.click(startButton);
            vi.advanceTimersByTime(2000);
            await user.click(stopButton);
        });

        expect(screen.getByText('00:00:02')).toBeDefined();
        expect(startButton).not.toBeDisabled();
    });

    test('reset stopwatch', async () => {
        await act(async () => {
            await user.click(startButton);
            vi.advanceTimersByTime(1000);
        });

        expect(screen.getByText('00:00:01')).toBeDefined();

        await act(async () => {
            await user.click(resetButton);
        });
        expect(screen.getByText('00:00:00')).toBeDefined();
        await user.click(stopButton);
    });

    test('displays minutes after 60 or more seconds have elapsed', async () => {
        await act(async () => {
            await user.click(startButton);
            vi.advanceTimersByTime(61 * 1000); // advance timer by 61 seconds
            await user.click(stopButton);
        });
        expect(screen.getByText('00:01:01')).toBeDefined();
    });
});
