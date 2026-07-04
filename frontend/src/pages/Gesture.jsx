import { useNavigate } from "react-router-dom";
import CameraPanel from "../components/CameraPanel";

export default function Gesture() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-400 to-blue-500 flex flex-col items-center justify-center px-6">

      <h1 className="text-4xl font-extrabold text-slate-900">
        🖐🏻 Gesture Detection
      </h1>

      <p className="mt-2 text-2xl text-slate-800 text-center max-w-3xl">
        Show your hand clearly in bright light and keep it inside the camera
        frame for accurate gesture detection.
      </p>

      <div className="mt-5 bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-6">
        <CameraPanel onGesture={() => {}} />
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition"
      >
        🏠 Back Home
      </button>

    </div>
  );
}