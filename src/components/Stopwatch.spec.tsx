import { describe, test, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Stopwatch from './Stopwatch';
import userEvent, { type UserEvent } from '@testing-library/user-event';

describe('Stopwatch', () => {
    let user: UserEvent;
    let startButton: HTMLElement;
    let stopButton: HTMLElement;
    let resetButton: HTMLElement;

    beforeEach(() => {
        render(<Stopwatch />);
        user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
        startButton = screen.getByTestId('start-button');
        stopButton = screen.getByTestId('stop-button');
        resetButton = screen.getByTestId('reset-button');
    });

    test('starts stopwatch', async () => {
        await user.click(startButton);
        vi.advanceTimersByTime(1000);
        expect(await screen.findByText('time elapsed is: 1')).toBeDefined();
    });

    test('cannot double click start button', async () => {
        await user.click(startButton);
        vi.advanceTimersByTime(1000);
        expect(startButton).toBeDisabled();
    });

    test('stops stopwatch', async () => {
        await user.click(startButton);
        vi.advanceTimersByTime(2000);
        await user.click(stopButton);
        expect(await screen.findByText('time elapsed is: 2')).toBeDefined();
    });

    test('reset stopwatch', async () => {
        await user.click(startButton);
        vi.advanceTimersByTime(1000);
        expect(await screen.findByText('time elapsed is: 1')).toBeDefined();

        await user.click(resetButton);
        expect(await screen.findByText('time elapsed is: 0')).toBeDefined();
    });
});
