export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h2 className="text-2xl font-bold text-sky-400">
          🧩 Gesture Puzzle
        </h2>

        <p className="mt-3 text-gray-400">
          Built with React, FastAPI, OpenCV, MediaPipe and Tailwind CSS.
        </p>

        <p className="mt-6 text-gray-500 text-sm">
          © 2026 Gesture Puzzle. All rights reserved.
        </p>
      </div>
    </footer>
  );
}