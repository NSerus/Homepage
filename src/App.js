import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [time, setTime] = useState('');

  function formatTime(val){
    if (val < 10) {
      return '0';
    }else{
      return '';
    }
  }
  
  useEffect(() => {
    const timerID = setInterval(
      () => tick(), 1000
    )
    return function cleanup(){
      clearInterval(timerID);
    }
  })
  
  function tick() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
  
    setTime(formatTime(h) + h + ':' + formatTime(m) + m + ':'+ formatTime(s) + s)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>{time}</div>
      </header>
    </div>
  );
}



export default App;
