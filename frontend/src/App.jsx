import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Camera from "./pages/Camera";
import Puzzle from "./pages/Puzzle";
import Gesture from "./pages/Gesture";
import CaptureCamera from "./pages/CaptureCamera";
import BuiltInImages from "./pages/BuiltInImages";
import UploadImage from "./pages/UploadImage";
import Result from "./pages/Result";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Capture-Camera Page */}
        <Route path="/capture-camera" element={<CaptureCamera />} />

        {/* BuiltInImage Page */}
        <Route path="/built-in-images" element={<BuiltInImages />} />

        {/* Upload Page */}
        <Route path="/upload-image" element={<UploadImage />} />

        {/* Result Page */}
        <Route path="/result" element={<Result />} />

        {/* Camera Page */}
        <Route path="/camera" element={<Camera />} />

        {/* Puzzle Page */}
        <Route path="/puzzle" element={<Puzzle />} />

        {/* Gesture Detection Page */}
        <Route path="/gesture" element={<Gesture />} />
      </Routes>
    </BrowserRouter>
  );
}