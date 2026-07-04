export default function DashboardHeader({
  moves,
  gesture,
  time,
  bestMoves,
  bestTime,
}) {
  return (
    <header className="flex flex-col items-center">
      <h1 className="text-3xl font-extrabold mb-4 text-slate-900">
        🧩 AI Gesture Puzzle
      </h1>

      <div className="flex gap-4">
        <div className="w-28 rounded-2xl bg-white/35 backdrop-blur-xl border border-white/60 px-3 py-3 text-center shadow-lg">
          <p className="text-xs text-slate-600 font-semibold">Moves</p>
          <h2 className="text-2xl font-extrabold text-blue-700">{moves}</h2>
          <p className="text-[11px] text-slate-700 font-semibold">
            Best: {bestMoves ?? "--"}
          </p>
        </div>

        <div className="w-32 rounded-2xl bg-white/35 backdrop-blur-xl border border-white/60 px-3 py-3 text-center shadow-lg">
          <p className="text-xs text-slate-600 font-semibold">Time</p>
          <h2 className="text-xl font-extrabold text-blue-700">⏱ {time}</h2>
          <p className="text-[11px] text-slate-700 font-semibold">
            Best: {bestTime || "--:--"}
          </p>
        </div>

        <div className="w-32 rounded-2xl bg-white/35 backdrop-blur-xl border border-white/60 px-3 py-3 text-center shadow-lg">
          <p className="text-xs text-slate-600 font-semibold">Gesture</p>
          <h2 className="text-lg font-extrabold">
            {gesture.pinching ? (
              <span className="text-blue-700">Pinch 🤏🏻</span>
            ) : (
              <span className="text-slate-800">Open 🤚🏻</span>
            )}
          </h2>
        </div>
      </div>
    </header>
  );
}