import { useState } from 'react';

export default function Stopwatch() {
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(0);

    // TODO: add miliseconds up to  hundredsth place
    // TODO: convert from seconds to minutes after 60 seconds
    function startTimer() {
        if (!startButtonDisabled()) {
            // start button is not disabled
            const id = setInterval(() => {
                setTimer((timer) => timer + 1);
            }, 1);
            setIntervalId(id);
            toggleStartButtonUsability();
        }
    }

    function stopTimer() {
        clearInterval(intervalId);
        setIntervalId(-1);
        if (startButtonDisabled()) {
            toggleStartButtonUsability();
        }
    }

    function resetTimer() {
        setTimer(0);
    }

    function formatTimer() {
        let ms = timer;

        const hours = Math.floor(ms / 3600000);
        ms %= 3600000;
        const minutes = Math.floor(ms / 60000);
        ms %= 60000;
        const seconds = Math.floor(ms / 1000);
        const milliseconds = ms % 1000;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
    }

    function startButtonDisabled() {
        const startButton = document.getElementById('start-button');
        if (startButton?.hasAttribute('disabled')) {
            return true;
        }
        return false;
    }

    function toggleStartButtonUsability() {
        const startButton = document.getElementById('start-button');
        if (startButtonDisabled()) {
            startButton?.removeAttribute('disabled');
        } else {
            startButton?.setAttribute('disabled', '');
        }
    }

    return (
        <>
            <h2>stopwatch</h2>
            <div className="card">
                <p>{formatTimer()}</p>
                <button
                    onClick={startTimer}
                    id="start-button"
                    data-testid="start-button"
                >
                    start timer
                </button>

                <button onClick={stopTimer} data-testid="stop-button">
                    stop timer
                </button>

                <button onClick={resetTimer} data-testid="reset-button">
                    reset timer
                </button>
            </div>
        </>
    );
}
