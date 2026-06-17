import { useEffect, useState } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

function compute(target: number): TimeLeft {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    isLive: false,
  };
}

/** Live countdown to an ISO date string. Recomputes once per second. */
export function useCountdown(isoDate: string): TimeLeft {
  const target = new Date(isoDate).getTime();
  const [time, setTime] = useState<TimeLeft>(() => compute(target));

  useEffect(() => {
    const id = window.setInterval(() => setTime(compute(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return time;
}
