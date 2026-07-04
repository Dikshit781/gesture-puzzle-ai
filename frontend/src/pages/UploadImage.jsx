import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadImage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG, JPEG and PNG images are allowed.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    navigate("/camera", {
      state: {
        selectedImage: imageUrl,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-400 to-blue-500 flex flex-col items-center justify-center p-8">

      <h1 className="text-5xl font-extrabold text-slate-900">
        Upload Your Image 📂
      </h1>

      <p className="mt-3 text-xl text-slate-700">
        Select a JPG or PNG image from your computer.
      </p>

      <div
        onClick={() => fileInputRef.current.click()}
        className="mt-12 w-[520px] h-[260px]
        rounded-3xl
        border-4 border-dashed border-white/70
        bg-white/30 backdrop-blur-xl
        flex flex-col justify-center items-center
        cursor-pointer
        hover:bg-white/50
        hover:scale-105
        transition-all duration-300
        shadow-2xl"
      >
        <div className="text-7xl">
            📂
        </div>

        <h2 className="mt-5 text-3xl font-bold text-slate-900">
            Choose Image
        </h2>

        <p className="mt-2 text-slate-700">
            JPG • JPEG • PNG
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={handleUpload}
      />

      <button
        onClick={() => navigate("/camera")}
        className="mt-10 rounded-2xl
        border border-white/60
        bg-white/30
        hover:bg-white/50
        backdrop-blur-xl
        px-10 py-4
        text-lg font-bold
        shadow-xl
        transition-all duration-300
        hover:scale-105"
      >
        ⬅ Back
      </button>

    </div>
  );
}