export default function ControlBar({ onRestart, onHome }) {
  return (
    <div className="flex justify-center gap-5 mt-2">
      <button
        onClick={onRestart}
        className="rounded-2xl border border-white/60 bg-white/35 backdrop-blur-xl hover:bg-white/55 text-slate-900 px-8 py-4 font-bold shadow-xl transition-all duration-300 hover:scale-105"
      >
        🔄 Restart
      </button>

      <button
        onClick={onHome}
        className="rounded-2xl border border-white/60 bg-white/35 backdrop-blur-xl hover:bg-white/55 text-slate-900 px-8 py-4 font-bold shadow-xl transition-all duration-300 hover:scale-105"
      >
        🏠 Home
      </button>
    </div>
  );
}