import "./css/Pomo.css";
import React, { useState, useEffect } from "react";

function Pomo() {
  const sessionMin = 25;
  const sessionSec = 0;
  const breakMin = 5;
  const breakSec = 0;

  const [minutes, setMinutes] = useState(sessionMin);
  const [seconds, setSeconds] = useState(sessionSec);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;

    if (isActive) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer is up, reset to default values
            clearInterval(timer);
            setIsActive(false);
            if (!isBreak) {
              alert("Pomodoro session completed!");
              setMinutes(breakMin);
              setSeconds(breakSec);
              setIsBreak(true);
            } else {
              alert("Break completed!");
              setMinutes(sessionMin);
              setSeconds(sessionSec);
              setIsBreak(false);
            }
          } else {
            // Decrease minutes and set seconds to 59
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          // Decrease seconds
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }

    // Cleanup function to clear the interval when the component is unmounted or when isActive becomes false
    return () => clearInterval(timer);
  }, [isActive, minutes, seconds]);

  function startTimer() {
    setIsActive(true);
  }

  function pauseTimer() {
    setIsActive(false);
  }

  function resetTimer() {
    setIsActive(false);
    if (isBreak) {
      setMinutes(breakMin);
      setSeconds(breakSec);
    } else {
      setMinutes(sessionMin);
      setSeconds(sessionSec);
    }
  }

  function skip() {
    setIsActive(false);
    if (isBreak) {
      setIsBreak(false);
      setMinutes(sessionMin);
      setSeconds(sessionSec);
    } else {
      setIsBreak(true);
      setMinutes(breakMin);
      setSeconds(breakSec);
    }
  }

  return (
    <div class="pomo">
      <p class="time">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>
      <button onClick={startTimer} disabled={isActive}>
        <span class="material-symbols-outlined">play_arrow</span>
      </button>
      <button onClick={skip}>
        <span class="material-symbols-outlined">skip_next</span>
      </button>
      <button onClick={pauseTimer} disabled={!isActive}>
        <span class="material-symbols-outlined fill">pause</span>
      </button>
      <button onClick={resetTimer}>
        <span class="material-symbols-outlined">restart_alt</span>
      </button>
    </div>
  );
}

export default Pomo;
