import { useState } from 'react'

function Stopwatch() {
    const [timer, setTimer] = useState(0)
    const [intervalId, setIntervalId] = useState(0)

    function startTimer() {
        const id = setInterval(() => { setTimer((timer) => timer + 1) }, 1000)
        setIntervalId(id)
    }

    function stopTimer() {
        clearInterval(intervalId);
    }

    function clearTimer() {
        setTimer(0)
    }

    return (
        <>
            <h2>stopwatch</h2>
            <div className="card">
                <p>time elapsed is: {timer}</p>
                <button onClick={startTimer}>
                    start timer
                </button>

                <button onClick={stopTimer}>
                    stop timer
                </button>

                <button onClick={clearTimer}>
                    clear timer
                </button>
            </div>
        </>
    )
}

export default Stopwatch
