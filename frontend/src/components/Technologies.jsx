import { motion } from "framer-motion";

const techs = [
  {
    icon: "⚛️",
    name: "React",
    desc: "Interactive and responsive user interface",
  },
  {
    icon: "🎨",
    name: "Tailwind CSS",
    desc: "Modern and responsive styling framework",
  },
  {
    icon: "🚀",
    name: "FastAPI",
    desc: "High-performance Python backend",
  },
  {
    icon: "🐍",
    name: "Python",
    desc: "Core programming language",
  },
  {
    icon: "📸",
    name: "OpenCV",
    desc: "Image processing and puzzle generation",
  },
  {
    icon: "👁️",
    name: "MediaPipe",
    desc: "Real-time hand tracking and gesture recognition",
  },
  {
    icon: "🤖",
    name: "TensorFlow",
    desc: "AI and machine learning support",
  },
  {
    icon: "🌐",
    name: "JavaScript",
    desc: "Frontend logic and interactivity",
  },
];

export default function Technologies() {
  return (
    <section
      id="technologies"
      className="py-24 bg-gradient-to-b from-white via-sky-50 to-sky-100"
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
            Technologies Used
          </h2>

          <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto">
            AI Gesture Puzzle combines cutting-edge technologies in
            Artificial Intelligence, Computer Vision, Web Development,
            and Real-Time Gesture Recognition.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

          {techs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.06,
                y: -10,
              }}
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
              <div className="text-6xl text-center">
                {tech.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-center text-blue-700">
                {tech.name}
              </h3>

              <p className="mt-4 text-center text-slate-600 leading-7">
                {tech.desc}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}