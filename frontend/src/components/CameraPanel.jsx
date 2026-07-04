import { useEffect, useRef, useState } from "react";
import {
  FilesetResolver,
  HandLandmarker,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

export default function CameraPanel({ onGesture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const modelRef = useRef(null);
  const frameRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);
  const onGestureRef = useRef(onGesture);

  const [status, setStatus] = useState("Loading AI model...");
  const [isPinching, setIsPinching] = useState(false);
  const [fingerPos, setFingerPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    onGestureRef.current = onGesture;
  }, [onGesture]);

  function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  useEffect(() => {
    let active = true;

    async function start() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
        );

        const model = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "/models/hand_landmarker.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 1,
        });
        if (!active) {
          model.close?.();
          return;
        }

        modelRef.current = model;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, frameRate: 30 },
          audio: false,
        });
        if (!active) {
           stream.getTracks().forEach((track) => track.stop());
           model.close?.();
           return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setStatus("Show your hand");
          detect();
        }
      } catch (error) {
        console.error(error);
        setStatus("Camera/model failed");
      }
    }

    function detect() {
      if (!active) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const model = modelRef.current;

      if (!video || !canvas || !model || video.readyState < 2) {
        frameRef.current = requestAnimationFrame(detect);
        return;
      }

      if (video.currentTime === lastVideoTimeRef.current) {
        frameRef.current = requestAnimationFrame(detect);
        return;
      }

      lastVideoTimeRef.current = video.currentTime;

      const width = video.videoWidth || 640;
      const height = video.videoHeight || 480;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);

      const results = model.detectForVideo(video, performance.now());

      if (results.landmarks?.length > 0) {
        const landmarks = results.landmarks[0];

        const thumb = landmarks[4];

        const fingers = [
          landmarks[8],  // index
          landmarks[12], // middle
          landmarks[16], // ring
          landmarks[20], // pinky
        ];

        let closestFinger = fingers[0];
        let minDistance = distance(thumb, closestFinger);

        for (const finger of fingers) {
          const d = distance(thumb, finger);
          if (d < minDistance) {
            minDistance = d;
            closestFinger = finger;
          }
        }

        const x = Math.round((1 - closestFinger.x) * width);
        const y = Math.round(closestFinger.y * height);

        const pinch = minDistance < 0.09;

        setStatus("Hand detected ✅");
        setFingerPos({ x, y });
        setIsPinching(pinch);

        onGestureRef.current?.({
          x,
          y,
          pinching: pinch,
        });

        ctx.save();
        ctx.translate(width, 0);
        ctx.scale(-1, 1);

        const drawingUtils = new DrawingUtils(ctx);

        drawingUtils.drawConnectors(
          landmarks,
          HandLandmarker.HAND_CONNECTIONS,
          { color: "#22c55e", lineWidth: 4 }
        );

        drawingUtils.drawLandmarks(landmarks, {
          color: "#f43f5e",
          radius: 5,
        });

        if (pinch) {
          ctx.beginPath();
          ctx.arc(
            closestFinger.x * width,
            closestFinger.y * height,
            16,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "#22c55e";
          ctx.fill();
          ctx.strokeStyle = "white";
          ctx.lineWidth = 4;
          ctx.stroke();
        }

        ctx.restore();
      } else {
        setStatus("Show your hand");
        setIsPinching(false);

        onGestureRef.current?.({
          x: 0,
          y: 0,
          pinching: false,
        });
      }

      frameRef.current = requestAnimationFrame(detect);
    }

    start();

    return () => {
    active = false;

    if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
    }

    if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
        streamRef.current = null;
    }

    if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
    }

    if (modelRef.current) {
        modelRef.current.close();
        modelRef.current = null;
    }
    };
  }, []);

  return (
    <div className="w-[460px] bg-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl p-4">
      <h2 className="text-2xl font-bold text-center mb-3">
        ✋ Gesture Camera
      </h2>

      <div className="relative w-full h-[345px] overflow-hidden rounded-2xl border-2 border-blue-500">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute top-0 left-0 w-full h-full object-cover scale-x-[-1]"
        />

        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="bg-white/30 backdrop-blur-xlborder border-white/40 rounded-2xl py-3">
          <p className="text-slate-900 font-semibold text-sm">Finger X</p>
          <p className="text-slate-900 font-bold">{fingerPos.x}</p>
        </div>

        <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl py-3">
          <p className="text-slate-900 font-semibold text-sm">Finger Y</p>
          <p className="text-slate-900 font-bold">{fingerPos.y}</p>
        </div>

        <div className="bg-white/30 backdrop-blur-xlborder border-white/40 rounded-2xl py-3">
          <p className="text-slate-900 font-semibold text-sm">Gesture</p>
          <p className={isPinching ? "text-blue-700 font-bold" : "text-gray-300 font-bold"}>
            {isPinching ? "Pinch 🤏🏻" : "Open 🖐🏻"}
          </p>
        </div>
      </div>

      <p className="text-center text-blue-900 mt-3 font-extrabold text-lg">
        {status}
      </p>
    </div>
  );
}