import { motion } from "framer-motion";

const features = [
  {
    icon: "🖐🏻",
    title: "Gesture Control",
    description:
      "Move, pick and place puzzle pieces using real-time hand tracking powered by MediaPipe.",
  },
  {
    icon: "🤖",
    title: "AI Puzzle Generation",
    description:
      "Capture any image and automatically convert it into an interactive puzzle within seconds.",
  },
  {
    icon: "🎯",
    title: "Multiple Difficulty Levels",
    description:
      "Challenge yourself with Easy (3×3), Medium (4×4) or Hard (5×5) puzzle modes.",
  },
  {
    icon: "⚡",
    title: "Real-Time Experience",
    description:
      "Experience smooth gameplay with instant gesture recognition and responsive controls.",
  },
  {
    icon: "🏆",
    title: "Performance Tracking",
    description:
      "Track your moves, timer, best score, best time and celebrate every completed puzzle.",
  },
  {
    icon: "🎉",
    title: "Immersive Gameplay",
    description:
      "Enjoy sound effects, confetti celebrations and an engaging hands-free puzzle experience.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-sky-100 via-sky-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-blue-700">
            Amazing Features
          </h2>

          <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto">
            AI Gesture Puzzle combines Artificial Intelligence,
            Computer Vision and modern web technologies to deliver
            a fun and completely hands-free gaming experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">

          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                y: -8,
              }}
              transition={{ duration: 0.3 }}
              className="
                bg-white/80
                backdrop-blur-lg
                border
                border-sky-200
                rounded-3xl
                p-8
                shadow-xl
                hover:shadow-blue-300/50
                transition
              "
            >
              <div className="text-6xl">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-blue-700">
                {feature.title}
              </h3>

              <p className="mt-4 text-slate-600 leading-7">
                {feature.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}