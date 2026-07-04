import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function Hero() {
  const navigate = useNavigate();

  const techStack = [
    "⚛️ React",
    "🐍 FastAPI",
    "📷 OpenCV",
    "✋ MediaPipe",
    "🎨 Tailwind CSS",
    "🤖 AI",
  ];

  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-400 to-blue-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-between px-8">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
            Control Puzzles
            <br />
            <span className="text-white drop-shadow-lg">
            With Your Hand🧩
            </span>
          </h1>

          <p
            className="mt-8 text-3xl text-slate-800 leading-relaxed"
            style={{
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            Experience the future of puzzle gaming using Artificial
            Intelligence, Computer Vision and Hand Gesture Recognition.
            Capture your own image, choose a difficulty level and solve
            the puzzle without touching the screen.
          </p>

          {/* Buttons */}
          <div className="flex gap-5 mt-12">
            <button
              onClick={() => navigate("/gesture")}
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition"
            >
              🤚 Try Gesture Demo
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative mt-20 lg:mt-0"
        >
          {/* Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-white/40 blur-3xl"></div>

          {/* Floating Hand */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="relative text-[220px]"
          >
            🖐🏻
          </motion.div>

          {/* Floating Puzzle Pieces */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-6 -left-10 text-6xl"
          >
            🧩
          </motion.div>

          <motion.div
            animate={{ y: [0, 18, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute bottom-16 right-0 text-5xl"
          >
            🐍
          </motion.div>

          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute top-44 right-[-40px] text-4xl"
          >
            🎨
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-slate-900"
      >
        <p className="font-semibold">Scroll to Explore</p>
        <div className="text-3xl">⌄</div>
      </motion.div>
    </section>
  );
}
