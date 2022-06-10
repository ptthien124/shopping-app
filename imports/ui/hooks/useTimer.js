import { useEffect, useState } from "react";

function useTimer(value, type = "countUp", unit = "s") {
  const unitList = { ms: 1, s: 1000, min: 60000, hrs: 3600000 };

  const [timer, setTimer] = useState(value);
  const [typeValue, setTypeValue] = useState(type);

  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isStop, setIsStop] = useState(false);

  useEffect(() => {
    if (isStart) {
      const interval = setInterval(() => {
        if (typeValue === "countUp") {
          setTimer((prev) => prev + 1);
        } else {
          setTimer((prev) => prev - 1);
        }
      }, unitList[unit]);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isStart, typeValue]);

  const start = () => {
    if (!isStop && !isPause) {
      setIsStart(true);
    }
  };

  const pause = () => {
    if (!isStop) {
      setIsStart(false);
      setIsPause(true);
    }
  };

  const resume = () => {
    if (!isStop) {
      setIsStart(true);
    }
  };
  const stop = () => {
    if (isStart) {
      setIsStart(false);
      setIsStop(true);
    }
  };

  const SetType = () => {
    if (typeValue === "countUp") {
      setTypeValue("countDown");
    } else {
      setTypeValue("countUp");
    }
  };

  return [timer, start, pause, resume, stop, SetType];
}

export default useTimer;
