import { useState, useRef } from "react";

import ResultModal from "./ResultModal.jsx";

// let timer;

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    // timer.current = setTimeout(() => {
    //   setTimerExpired(true);
    //   dialog.current.open();
    // }, targetTime * 1000);

    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10); // 10ms 단위로 업데이트
    }, 10);

    setTimerStarted(true);
  }

  function handleStop() {
    // clearInter(timer.current);
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button
            //   onClick={timerStarted ? handleStop : handleStart}
            onClick={timerIsActive ? handleStop : handleStart}
          >
            {/* {timerStarted ? "Stop" : "Start"} Challenge */}
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p
          // className={timerStarted ? "active" : undefined}
          className={timerIsActive ? "acrive" : undefined}
        >
          {/* {timerStarted ? "Time is running..." : "Timer Inactive"} */}
          {timerIsActive ? "Time is running..." : "Timer Inactive"}
        </p>
      </section>
    </>
  );
}
