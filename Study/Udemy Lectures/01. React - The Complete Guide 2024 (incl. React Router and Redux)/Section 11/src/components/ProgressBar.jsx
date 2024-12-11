import { useState, useEffect } from "react";

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    console.log("INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10); // 10ms 마다 반복 실행

    return () => {
      console.log("Cleaning up interval");
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timer} />;
}
