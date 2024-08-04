import React, { useState, useEffect } from "react";

import "./stopwatch.css";

const Stopwatch = ({ resetTimer, stopTimer }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    if (resetTimer) {
      setTime(0);
      setIsRunning(true)
    }
  }, [resetTimer]);

  useEffect(() => {
    if (stopTimer) {
      setIsRunning(false);
    }
  }, [stopTimer]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>

      </div>

  );
};

export default Stopwatch;