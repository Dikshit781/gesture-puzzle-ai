import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

export default function CaptureCamera() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [cameraReady, setCameraReady] = useState(false);
  const [toast, setToast] = useState("📷 Starting camera... Please wait.");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const goBack = () => {
    navigate("/camera");
  };

  const capture = () => {
    const video = webcamRef.current?.video;

    if (!video || video.readyState < 2 || !cameraReady) {
      showToast("📷 Camera is starting... Please wait.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      showToast("Canvas not supported.");
      return;
    }

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageSrc = canvas.toDataURL("image/jpeg");

    navigate("/camera", {
      state: {
        selectedImage: imageSrc,
      },
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-200 via-sky-400 to-blue-500 text-slate-900 flex flex-col items-center justify-center p-8">
      {toast && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-white/80 border border-sky-200 rounded-2xl px-5 py-4 shadow-2xl">
            <p className="text-slate-800 font-semibold">{toast}</p>
          </div>
        </div>
      )}

      <h1 className="text-5xl font-extrabold mb-8">
        Capture Your Image 📷
      </h1>

      <div className="relative rounded-3xl border-4 border-white/70 shadow-2xl overflow-hidden w-[700px] min-h-[394px] flex items-center justify-center bg-white/30 backdrop-blur-xl">
        {!cameraReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <p className="text-blue-700 text-xl font-bold animate-pulse">
              📷 Starting camera...
            </p>
          </div>
        )}

        <Webcam
          ref={webcamRef}
          mirrored={false}
          screenshotFormat="image/jpeg"
          audio={false}
          width={700}
          className="scale-x-[-1]"
          onUserMedia={() => {
            setCameraReady(true);
            showToast("✅ Camera ready.");
          }}
          onUserMediaError={() => {
            setCameraReady(false);
            showToast("Camera permission denied.");
          }}
        />
      </div>

      <div className="flex justify-center gap-5 mt-8">
        <button
          onClick={goBack}
          className="rounded-2xl border border-white/60 bg-white/30 hover:bg-white/50 backdrop-blur-xl text-slate-900 px-10 py-4 text-xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
        >
          ⬅️ Back
        </button>

        <button
          onClick={capture}
          disabled={!cameraReady}
          className="rounded-2xl border border-white/60 bg-white/30 hover:bg-white/50 backdrop-blur-xl text-slate-900 px-10 py-4 text-xl font-bold shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          📸 Capture Image
        </button>
      </div>
    </div>
  );
}