import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section
      id="cta"
      className="py-28 bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-300"
    >
      <div className="max-w-6xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[2rem] p-12 shadow-2xl"
        >
          <h2 className="text-5xl font-extrabold text-slate-900">
            Ready to Challenge Yourself?
          </h2>

          <p className="mt-5 text-xl text-slate-700 max-w-3xl mx-auto">
            Capture your own image, select a difficulty level, and solve the
            puzzle using AI-powered hand gestures.
          </p>

          <button
            onClick={() => navigate("/camera")}
            className="mt-10 bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition"
          >
            🚀 Start Playing
          </button>
        </motion.div>
      </div>
    </section>
  );
}