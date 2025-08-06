import { useState } from 'react';
import '../assets/style.css';

export default function Stopwatch() {
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(0);

    function toggleTimer() {
        const startPauseButton = document.getElementById('start-pause-button');

        if (startPauseButton?.textContent == 'start') {
            const id = setInterval(() => {
                setTimer((timer) => timer + 1);
            }, 1000);
            setIntervalId(id);
            startPauseButton.textContent = 'pause';
        } else {
            if (startPauseButton) {
                clearInterval(intervalId);
                setIntervalId(-1);
                startPauseButton.textContent = 'start';
            }
        }
    }

    function resetTimer() {
        setTimer(0);
    }

    function formatTimer() {
        let seconds = timer;

        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return (
        <>
            <h2>stopwatch</h2>
            <div className="card">
                <p>{formatTimer()}</p>
                <button
                    onClick={toggleTimer}
                    id="start-pause-button"
                    data-testid="start-pause-button"
                >
                    start
                </button>

                <button onClick={resetTimer} data-testid="reset-button">
                    reset
                </button>
            </div>
        </>
    );
}
