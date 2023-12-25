import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(""); //useState to have a value that can be updated

  function formatTime(val) {
    // to keep the '00:00:00' format instead of being like 0:0:01
    if (val < 10) {
      return "0";
    } else {
      return "";
    }
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    // function for each tick
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();

    setTime(
      formatTime(h) + h + ":" + formatTime(m) + m + ":" + formatTime(s) + s
    ); // sets all the values to the constant to put on DOM
  }

  return (
    <header className="App-header">
      <div>{time}</div>
    </header>
  );
}

export default App;
