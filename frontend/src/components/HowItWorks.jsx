import { motion } from "framer-motion";

const steps = [
  {
    icon: "📷",
    title: "Capture Image",
    text: "Use your webcam to capture a photo. This image becomes the base of your puzzle.",
  },
  {
    icon: "🎯",
    title: "Select Difficulty",
    text: "Choose Easy, Medium, or Hard after capturing the image.",
  },
  {
    icon: "🧩",
    title: "Generate Puzzle",
    text: "The backend splits your image into puzzle pieces based on the selected level.",
  },
  {
    icon: "🖐🏻",
    title: "Control With Gestures",
    text: "Move your hand to control the cursor. Pinch to pick and drop puzzle pieces.",
  },
  {
    icon: "🎉",
    title: "Solve & Celebrate",
    text: "Complete the puzzle and enjoy timer, moves, sounds, best score, and confetti.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-gradient-to-b from-sky-100 via-white to-sky-50"
    >
      <div className="max-w-7xl mx-auto px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-blue-700"
        >
          How It Works
        </motion.h2>

        <p className="mt-5 text-lg text-slate-600  max-w-5xl mx-auto">
          AI Gesture Puzzle is an interactive application that combines Artificial Intelligence, Computer Vision, and real-time hand gesture recognition to create a touch-free puzzle-solving experience. Users capture an image using their webcam, select a difficulty level, and the system automatically generates puzzle pieces using OpenCV. MediaPipe tracks hand movements, allowing users to pick, move, and place puzzle pieces using natural gestures. The application also tracks time, moves, and best scores, and celebrates successful completion with animations and sound effects, providing an engaging and immersive gaming experience.
        </p>

        <div className="mt-18 grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.04 }}
              className="bg-white/80 border border-sky-200 rounded-3xl p-6 shadow-xl hover:shadow-blue-300/50 transition"
            >
              <div className="text-5xl">{step.icon}</div>

              <h3 className="mt-5 text-xl font-bold text-blue-700">
                {step.title}
              </h3>

              <p className="mt-3 text-slate-600 text-sm leading-6">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}