export default function VictoryModal({
  open,
  moves,
  time,
  onRestart,
  onHome,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[6000] flex items-center justify-center bg-black/45 backdrop-blur-[2px]">
      <div className="relative w-[500px] rounded-3xl border border-green-500 bg-slate-900 p-8 shadow-[0_0_60px_rgba(34,197,94,0.45)] animate-[pop_0.35s_ease]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 hover:bg-red-500 text-white text-xl font-bold flex items-center justify-center transition"
        >
          ×
        </button>

        <h1 className="text-5xl text-center mb-3">🎉</h1>

        <h2 className="text-3xl font-bold text-center text-green-400">
          Puzzle Solved!
        </h2>

        <p className="text-center text-gray-400 mt-2">Congratulations!</p>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between bg-slate-800 rounded-xl px-5 py-4">
            <span>⏱️ Time</span>
            <span className="font-bold text-cyan-400">{time}</span>
          </div>

          <div className="flex justify-between bg-slate-800 rounded-xl px-5 py-4">
            <span>🔄 Moves</span>
            <span className="font-bold text-yellow-400">{moves}</span>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={onRestart}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold"
          >
            🔄 Play Again
          </button>

          <button
            onClick={onHome}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-bold"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}