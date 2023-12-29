import "./css/Clock.css";
import { useEffect, useState } from "react";

function Clock() {
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
    // makes function run every one second
    const timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      // clean if unmounted
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
      formatTime(h) + h + ":" + formatTime(m) + m + ":" + formatTime(s) + s // sets the time in the right format
    ); // sets all the values to the constant to put on DOM
  }

  return (
    <div>
      <div className="header">
        <div>{time}</div>
      </div>
    </div>
  );
}

export default Clock;
