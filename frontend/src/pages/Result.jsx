import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import victorySound from "../assets/sounds/victory.mp3";

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const audioRef = useRef(new Audio(victorySound));

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.volume = 1;

    audio.play().catch((error) => {
      console.log("Autoplay blocked:", error);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const resize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (!state) {
    navigate("/");
    return null;
  }

  const {
    originalImage,
    moves,
    time,
    difficulty = { label: "Easy", grid: 3 },
    bestMoves,
    bestTime,
  } = state;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-400 to-blue-500 flex items-center justify-center p-8">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={700}
        gravity={0.18}
        tweenDuration={9000}
      />

      <div className="w-full max-w-5xl bg-white/20 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl p-10">
        <h1 className="text-5xl font-extrabold text-center text-slate-900">
          🎉 Congratulations!
        </h1>

        <p className="text-center text-slate-700 text-xl mt-3">
          You completed the puzzle successfully.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-10">
          <div className="flex justify-center">
            <img
              src={originalImage}
              alt="Solved Puzzle"
              className="rounded-3xl shadow-2xl border-4 border-white/60 w-[450px]"
            />
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl bg-white/40 p-5">
              <h2 className="text-xl font-bold text-slate-900">
                📊 Game Statistics
              </h2>
            </div>

            <div className="rounded-2xl bg-white/30 p-5 flex justify-between">
              <span className="font-semibold">Difficulty</span>
              <span>{difficulty?.label || "Easy"}</span>
            </div>

            <div className="rounded-2xl bg-white/30 p-5 flex justify-between">
              <span className="font-semibold">Moves</span>
              <span>{moves}</span>
            </div>

            <div className="rounded-2xl bg-white/30 p-5 flex justify-between">
              <span className="font-semibold">Time</span>
              <span>{time}</span>
            </div>

            <div className="rounded-2xl bg-white/30 p-5 flex justify-between">
              <span className="font-semibold">Best Moves</span>
              <span>{bestMoves ?? "--"}</span>
            </div>

            <div className="rounded-2xl bg-white/30 p-5 flex justify-between">
              <span className="font-semibold">Best Time</span>
              <span>{bestTime ?? "--:--"}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-12">
          <button
            onClick={() => navigate("/Puzzle")}
            className="rounded-2xl border border-white/60 bg-white/30 hover:bg-white/50 backdrop-blur-xl px-10 py-4 font-bold shadow-lg transition hover:scale-105"
          >
            🔄 Play Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="rounded-2xl border border-white/60 bg-white/30 hover:bg-white/50 backdrop-blur-xl px-10 py-4 font-bold shadow-lg transition hover:scale-105"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}