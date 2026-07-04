import { useEffect, useState } from "react";

export default function Timer({ running, reset }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
  }, [reset]);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="bg-slate-900 border border-blue-500 rounded-xl px-5 py-3 shadow-lg">
      <p className="text-gray-400 text-sm">Time</p>
      <h2 className="text-2xl font-bold text-cyan-400">
        ⏱️ {minutes}:{secs}
      </h2>
    </div>
  );
}