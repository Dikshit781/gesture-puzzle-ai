import { useNavigate } from "react-router-dom";

export default function BuiltInImages() {
  const navigate = useNavigate();

  const sampleImages = [
    "/sample-images/sample1.jpg",
    "/sample-images/sample2.jpg",
    "/sample-images/sample3.jpg",
    "/sample-images/sample4.jpeg",
    "/sample-images/sample5.jpg",
  ];

  const selectImage = async (src, index) => {
    try {
      const response = await fetch(src);

      if (!response.ok) {
        throw new Error("Image not found");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      navigate("/camera", {
        state: {
          selectedImage: imageUrl,
        },
      });
    } catch (error) {
      console.error(error);
      alert(`Failed to load sample ${index + 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-400 to-blue-500 text-slate-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-extrabold mb-4">
        Choose Built-in Image 🖼️
      </h1>

      <p className="text-slate-700 font-semibold mb-10">
        Select a sample image to create your puzzle.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sampleImages.map((src, index) => (
          <button
            key={src}
            onClick={() => selectImage(src, index)}
            className="rounded-3xl overflow-hidden border-4 border-white/70 bg-white/30 shadow-2xl hover:scale-105 transition"
          >
            <img
              src={src}
              alt={`Sample ${index + 1}`}
              className="w-72 h-52 object-cover"
            />

            <div className="py-4 font-bold text-lg">
              Sample {index + 1}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate("/camera")}
        className="mt-10 rounded-2xl border border-white/60 bg-white/30 hover:bg-white/50 backdrop-blur-xl text-slate-900 px-10 py-4 text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105"
      >
        ⬅️ Back
      </button>
    </div>
  );
}