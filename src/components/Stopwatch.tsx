import { useState } from 'react';

export default function Stopwatch() {
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(0);

    // TODO: double clicking start prevents stop from working and speeds up timer
    // TODO: clear timer stops timer as well
    // TODO: add miliseconds up to  hundredsth place
    // TODO: convert from seconds to minutes after 60 seconds
    function startTimer(event: { target: HTMLElement }) {
        if (!event?.target.hasAttribute('disabled')) {
            const id = setInterval(() => {
                setTimer((timer) => timer + 1);
            }, 1000);
            setIntervalId(id);
            event.target.setAttribute('disabled', '');
        }
    }

    function stopTimer() {
        clearInterval(intervalId);
        setIntervalId(-1);
    }

    function resetTimer() {
        setTimer(0);
    }

    return (
        <>
            <h2>stopwatch</h2>
            <div className="card">
                <p>time elapsed is: {timer}</p>
                <button onClick={startTimer} data-testid="start-button">
                    start timer
                </button>

                <button onClick={stopTimer} data-testid="stop-button">
                    stop timer
                </button>

                <button onClick={resetTimer} data-testid="reset-button">
                    reset
                </button>
            </div>
        </>
    );
}
