import { motion } from "framer-motion";

const stats = [
  { value: "95%", title: "Gesture Accuracy", icon: "🎯" },
  { value: "3", title: "Difficulty Levels", icon: "🧩" },
  { value: "100%", title: "Hands-Free Puzzle Solving", icon: "🖐🏻" },
  { value: "Real-Time", title: "AI Tracking", icon: "⚡" },
];

export default function Stats() {
  return (
    <section
    id="stats"
    className="py-24 bg-gradient-to-b from-sky-50 via-white to-sky-100">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-5xl font-bold text-blue-700 text-center">
          Project Statistics
        </h2>

        <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto text-center">
          AI Gesture Puzzle delivers a hands-free gaming experience using computer vision and real-time hand tracking.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="bg-white/80 border border-sky-200 rounded-3xl p-8 shadow-xl hover:shadow-blue-300/50 transition text-center"
            >
              <div className="text-6xl mb-5">{stat.icon}</div>

              <h3 className="text-5xl font-extrabold text-blue-700">
                {stat.value}
              </h3>

              <p className="mt-4 text-slate-600 text-lg font-medium">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}