import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Camera() {
  
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  

  const sampleImages = [
    "/sample-images/sample1.jpg",
    "/sample-images/sample2.jpg",
    "/sample-images/sample3.jpg",
    "/sample-images/sample4.jpeg",
    "/sample-images/sample5.jpg",
  ];

  const [sourceMode, setSourceMode] = useState(null);
  const [image, setImage] = useState(null);
  const [difficulty, setDifficulty] = useState({ label: "Easy", grid: 3 });
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("");

  const difficulties = [
    { label: "Easy", grid: 3, emoji: "🛡️" },
    { label: "Medium", grid: 4, emoji: "⚔️" },
    { label: "Hard", grid: 5, emoji: "☠️" },
  ];

  const [loading, setLoading] = useState(false);
  
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (location.state?.selectedImage) {
      setImage(location.state.selectedImage);

      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
  }, [location.state]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const goHome = () => navigate("/");

  const changeImage = () => {
    setImage(null);
    setSourceMode(null);

    navigate("/camera", {
      replace: true,
      state: {},
    });
  };

  const continueToPuzzle = async () => {
    if (!image) return;

    setLoading(true);
    setLoadingProgress(0);
    setLoadingText("✂️ Splitting Image...");
    showToast("Creating puzzle...");
    let progress = 0;

    const progressInterval = setInterval(() => {
      progress += 5;

      if (progress <= 30) {
        setLoadingText("✂️ Splitting Image...");
      } else if (progress <= 60) {
        setLoadingText("📤 Uploading Image...");
      } else if (progress <= 85) {
        setLoadingText("🧠 AI is generating puzzle...");
      } else {
        setLoadingText("🧩 Preparing puzzle pieces...");
      }

      if (progress < 90) {
        setLoadingProgress(progress);
      }
    }, 150);
    const startTime = Date.now();

    try {
      const blob = await (await fetch(image)).blob();
      setLoadingText("📤 Uploading Image...");

      const formData = new FormData();
      const uniqueFileName = `puzzle-image-${Date.now()}.jpg`;
      formData.append("file", blob, uniqueFileName);
      formData.append("grid", difficulty.grid);

      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });
      setLoadingText("🧠 AI is generating puzzle...");

      const data = await response.json();
      setLoadingText("🧩 Preparing puzzle pieces...");

      if (!data.success) throw new Error("Upload failed");

      const cacheBust = Date.now();
      const puzzleData = {
        pieces: data.pieces.map((piece) => `${piece}?v=${cacheBust}`),
        original: `${data.original}?v=${cacheBust}`,
        difficulty,
        grid: difficulty.grid,
      };

      localStorage.setItem("puzzleData", JSON.stringify(puzzleData));

      const elapsed = Date.now() - startTime;
      const minimumLoading = 2500;

      if (elapsed < minimumLoading) {
        await new Promise((resolve) =>
          setTimeout(resolve, minimumLoading - elapsed)
        );
      }
      await new Promise(resolve => setTimeout(resolve, 600));

      clearInterval(progressInterval);
      setLoadingProgress(100);
      setLoadingText("🎮 Almost Ready...");

      await new Promise((resolve) => setTimeout(resolve, 600));

      navigate("/puzzle", { state: puzzleData });
    } catch (error) {
      console.error(error);
      showToast("Failed to create puzzle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-200 via-sky-400 to-blue-500 text-slate-900 flex flex-col items-center justify-center p-8">
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md flex items-center justify-center">
          <div className="w-[650px] rounded-3xl bg-white/30 backdrop-blur-2xl border border-white/40 shadow-2xl px-12 py-10">
            <h2 className="text-4xl font-extrabold text-center text-slate-900">
              🧩 Creating Your Puzzle
            </h2>
            <p className="text-center text-xl mt-5 font-semibold text-slate-800">
              {loadingText}
            </p>
            <div className="mt-10 w-full h-5 bg-white/40 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 transition-all duration-500"
                style={{
                  width: `${loadingProgress}%`,
                }}
              />
            </div>
            <p className="text-center mt-4 text-lg font-bold text-slate-800">
              {loadingProgress}%
            </p>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-white/80 border border-sky-200 rounded-2xl px-5 py-4 shadow-2xl">
            <p className="text-slate-800 font-semibold">{toast}</p>
          </div>
        </div>
      )}

      <h1 className="text-5xl font-extrabold mb-3">
        Choose Your Puzzle Image 🧩
      </h1>

      <p className="text-slate-700 font-semibold mb-8">
        Capture, upload, or select a built-in image to start playing.
      </p>

      {!image ? (
        <>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => navigate("/capture-camera")}
              className="w-56 rounded-3xl border border-white/60 bg-white/30 hover:bg-white/50 backdrop-blur-xl p-8 shadow-xl hover:scale-105 transition"
            >
              <div className="text-5xl">📸</div>
              <h2 className="text-xl font-bold mt-3">Camera</h2>
              <p className="text-sm text-slate-700 mt-2">Capture live image</p>
            </button>

            <button
              onClick={() => navigate("/built-in-images")}
              className="w-56 rounded-3xl border border-white/60 bg-white/30 hover:bg-white/50 backdrop-blur-xl p-8 shadow-xl hover:scale-105 transition"
            >
              <div className="text-5xl">🖼️</div>
              <h2 className="text-xl font-bold mt-3">Built-in</h2>
              <p className="text-sm text-slate-700 mt-2">Choose sample image</p>
            </button>

            <button
              onClick={() => navigate("/upload-image")}
              className="w-56 rounded-3xl border border-white/60 bg-white/30 hover:bg-white/50 backdrop-blur-xl p-8 shadow-xl hover:scale-105 transition"
            >
              <div className="text-5xl">📂</div>
              <h2 className="text-xl font-bold mt-3">Upload</h2>
              <p className="text-sm text-slate-700 mt-2">JPG / PNG only</p>
            </button>

          </div>
          <div className="flex justify-center mb-8">
            <button
              onClick={() => navigate("/")}
              className="rounded-2xl border border-white/60
                        bg-white/30 hover:bg-white/50
                        backdrop-blur-xl
                        px-10 py-4
                        text-slate-900 text-lg font-bold
                        shadow-lg
                        transition-all duration-300
                        hover:scale-105"
            >
              ⬅️ Back to Home
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-start justify-center gap-12 mt-6 w-full max-w-7xl">
          <div className="flex-1 flex flex-col items-center">
            <img
              src={image}
              alt="Selected"
              className="rounded-3xl border-4 border-white/70 shadow-2xl w-[650px]"
            />

            <div className="flex justify-center gap-5 mt-8 w-full">
              <button
                onClick={changeImage}
                className="flex-1 max-w-[180px] rounded-2xl border border-white/60 bg-white/30 hover:bg-white/50 backdrop-blur-xl text-slate-900 font-bold py-4 shadow-lg"
              >
                ⬅️ Back
              </button>

              <button
                onClick={changeImage}
                
                className="flex-1 max-w-[190px] rounded-2xl border border-white/60 bg-white/30 hover:bg-white/50 backdrop-blur-xl text-slate-900 font-bold py-4 shadow-lg"
              >
                🔄 Change Image
              </button>

              <button
                onClick={continueToPuzzle}
                disabled={loading}
                className="flex-1 max-w-[220px] rounded-2xl border border-white/60 bg-white/30 hover:bg-white/50 backdrop-blur-xl text-slate-900 font-bold py-4 shadow-lg disabled:opacity-50"
              >
                {loading
                  ? `Creating ${difficulty.grid}×${difficulty.grid}...`
                  : "🚀 Continue"}
              </button>
            </div>
          </div>

          <div className="w-[380px] bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-8">
            <h2 className="text-3xl font-extrabold text-center">
              Select Difficulty
            </h2>

            <p className="text-center text-slate-700 mt-2 mb-6">
              Choose puzzle complexity before starting.
            </p>

            <div className="space-y-2">
              {difficulties.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setDifficulty(item)}
                  className={`w-full rounded-2xl border px-6 py-5 transition font-semibold flex justify-between items-center ${
                    difficulty.grid === item.grid
                      ? "border-blue-700 bg-white/50 text-blue-700 shadow-xl scale-[1.03]"
                      : "border-white/60 bg-white/50 hover:bg-white/60 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{item.emoji}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-lg">{item.label}</h3>
                      <p className="text-sm">{item.grid} × {item.grid} Puzzle</p>
                    </div>
                  </div>

                  {difficulty.grid === item.grid && (
                    <span className="text-2xl">✅</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}