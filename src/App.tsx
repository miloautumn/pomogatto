import Stopwatch from './components/Stopwatch';
import pomogattoLogo from './assets/pomogatto.jpg';

import './App.css';

function App() {
    return (
        <>
            <div>
                <a
                    href="https://www.loc.gov/resource/pga.12042/"
                    target="_blank"
                >
                    <img
                        src={pomogattoLogo}
                        className="logo pomogatto"
                        alt="pomogatto logo"
                    />
                </a>
            </div>
            <h1>pomogatto</h1>
            <Stopwatch />
        </>
    );
}

export default App;
