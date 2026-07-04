import { motion } from "framer-motion";

export default function Navbar() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-sky-100/80 backdrop-blur-md border-b border-sky-300 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          onClick={() => scrollToSection("home")}
          className="text-2xl font-bold text-blue-700 cursor-pointer"
        >
          🧩 Gesture Puzzle
        </h1>

        <ul className="hidden md:flex gap-8 text-slate-700 font-semibold">
          <li
            onClick={() => scrollToSection("home")}
            className="hover:text-blue-700 cursor-pointer transition"
          >
            Home
          </li>

          <li
            onClick={() => scrollToSection("features")}
            className="hover:text-blue-700 cursor-pointer transition"
          >
            Features
          </li>

          <li
            onClick={() => scrollToSection("how-it-works")}
            className="hover:text-blue-700 cursor-pointer transition"
          >
            How It Works
          </li>

          <li
            onClick={() => scrollToSection("technologies")}
            className="hover:text-blue-700 cursor-pointer transition"
          >
            Technologies
          </li>

          <li
            onClick={() => scrollToSection("stats")}
            className="hover:text-blue-700 cursor-pointer transition"
          >
            Stats
          </li>
        </ul>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection("cta")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-lg"
        >
          Play
        </motion.button>
      </div>
    </nav>
  );
}