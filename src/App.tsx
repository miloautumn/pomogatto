import { useState } from 'react'
import pomogattoLogo from './assets/pomogatto.jpg'

import './App.css'

function App() {
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
      <div>
        <a href="https://www.loc.gov/resource/pga.12042/" target="_blank">
          <img src={pomogattoLogo} className="logo pomogatto" alt="pomogatto logo" />
        </a>
      </div>
      <h1>pomogatto</h1>
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

export default App
