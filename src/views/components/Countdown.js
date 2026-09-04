import { useState, useEffect } from 'react';

export default function Countdown({ dateString }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [dateString]);

  function calculateTimeLeft() {
    const target = new Date(dateString);
    const diff = Math.max(0, target.getTime() - Date.now());
    const sec = Math.floor(diff / 1000);
    return {
      days: Math.floor(sec / 86400),
      hours: Math.floor((sec % 86400) / 3600),
      minutes: Math.floor((sec % 3600) / 60),
      seconds: sec % 60,
    };
  }

  if (timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds === 0) {
    return <span className="badge bg-success rounded-pill px-3 py-2">Started</span>;
  }

  return (
    <span className="badge bg-primary rounded-pill px-3 py-2">
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </span>
  );
}