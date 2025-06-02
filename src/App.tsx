import { useState } from 'react'
import pomogattoLogo from './assets/pomogatto.jpg'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://www.loc.gov/resource/pga.12042/" target="_blank">
          <img src={pomogattoLogo} className="logo pomogatto" alt="pomogatto logo" />
        </a>
      </div>
      <h1>pomogatto</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 5)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
