export default function GestureStatus({ gesture }) {
  return (
    <div className="mt-4 bg-slate-950/70 border border-slate-700 rounded-2xl p-4 text-center">
      <h3 className="text-lg font-bold text-white mb-3">
        AI Tracking Status
      </h3>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-gray-400">X</p>
          <p className="text-blue-400 font-bold">
            {Math.round(gesture?.x || 0)}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Y</p>
          <p className="text-blue-400 font-bold">
            {Math.round(gesture?.y || 0)}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Gesture</p>
          <p
            className={`font-bold ${
              gesture?.pinching ? "text-green-400" : "text-gray-300"
            }`}
          >
            {gesture?.pinching ? "Pinch" : "Open"}
          </p>
        </div>
      </div>
    </div>
  );
}