import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import DashboardHeader from "../components/DashboardHeader";
import PuzzleBoard from "../components/PuzzleBoard";
import CameraPanel from "../components/CameraPanel";
import ControlBar from "../components/ControlBar";
import VirtualCursor from "../components/VirtualCursor";
import FloatingTile from "../components/FloatingTile";
import pickupSound from "../assets/sounds/pickup.mp3";
import dropSound from "../assets/sounds/drop.mp3";

export default function Puzzle() {
  const location = useLocation();
  const navigate = useNavigate();

  const [pieces, setPieces] = useState([]);
  const [originalPieces, setOriginalPieces] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [bestMoves, setBestMoves] = useState(() => {
    return Number(localStorage.getItem("bestMoves")) || null;
  });
  const [bestTime, setBestTime] = useState(() => {
    return Number(localStorage.getItem("bestTime")) || null;
  });
  const [timerStarted, setTimerStarted] = useState(false);
  const [solved, setSolved] = useState(false);

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const [gripOffset, setGripOffset] = useState({ x: 90, y: 90 });

  const previousPinchRef = useRef(false);
  const pickupAudio = useRef(new Audio(pickupSound));
  const dropAudio = useRef(new Audio(dropSound));

  const [gesture, setGesture] = useState({
    x: 0,
    y: 0,
    pinching: false,
  });

  const floatingPiece =
    selectedIndex !== null ? pieces[selectedIndex] : null;

  const grid =
  location.state?.grid ||
  JSON.parse(localStorage.getItem("puzzleData"))?.grid ||
  3;

  const puzzleSize = 540;
  const tileSize = puzzleSize / grid;
  const totalPieces = grid * grid;

  const cursorX = (gesture.x / 640) * puzzleSize;
  const cursorY = (gesture.y / 480) * puzzleSize;

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const formattedTime = `${minutes}:${secs}`;

  const bestMinutes = bestTime !== null
    ? String(Math.floor(bestTime / 60)).padStart(2, "0")
    : "--";

  const bestSeconds = bestTime !== null
    ? String(bestTime % 60).padStart(2, "0")
    : "--";

  const formattedBestTime = `${bestMinutes}:${bestSeconds}`;

  useEffect(() => {
    if (
      !timerStarted ||
      solved ||
      pieces.length !== totalPieces
    ) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerStarted, solved, pieces.length, totalPieces]);

  useEffect(() => {
    let puzzleData = location.state;

    if (puzzleData?.pieces?.length === totalPieces) {
      localStorage.setItem("puzzleData", JSON.stringify(puzzleData));
    } else {
      const saved = localStorage.getItem("puzzleData");
      puzzleData = saved ? JSON.parse(saved) : null;
    }

    if (!puzzleData?.pieces || puzzleData.pieces.length !== totalPieces) {
      localStorage.removeItem("puzzleData");
      setPieces([]);
      setOriginalPieces([]);
      setOriginalImage(null);
      return;
    }

    const original = [...puzzleData.pieces];
    const shuffled = [...original];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setOriginalImage(puzzleData.original);
    setOriginalPieces(original);
    setPieces(shuffled);
    setMoves(0);
    setSeconds(0);
    setTimerStarted(false);
    setSolved(false);
    setHoveredIndex(-1);
    setSelectedIndex(null);
    setGripOffset({ x: 90, y: 90 });
    previousPinchRef.current = false;
  }, [location.state]);

  useEffect(() => {
    if (solved || pieces.length !== totalPieces) {
      setHoveredIndex(-1);
      return;
    }

    if (
      cursorX < 0 ||
      cursorY < 0 ||
      cursorX >= puzzleSize ||
      cursorY >= puzzleSize
    ) {
      setHoveredIndex(-1);
      return;
    }

    const col = Math.floor(cursorX / tileSize);
    const row = Math.floor(cursorY / tileSize);
    const index = row * grid + col;

    setHoveredIndex(index >= 0 && index < totalPieces ? index : -1);
  }, [cursorX, cursorY, solved, pieces.length]);

  function swapPieces(fromIndex, toIndex) {
    if (
      fromIndex === null ||
      toIndex === null ||
      fromIndex === toIndex ||
      pieces.length !== totalPieces
    ) {
      return;
    }

    const updated = [...pieces];

    [updated[fromIndex], updated[toIndex]] = [
      updated[toIndex],
      updated[fromIndex],
    ];

    setPieces(updated);

    const newMoves = moves + 1;
    setMoves(newMoves);

    if (newMoves === 1) {
      setTimerStarted(true);
    }

    const isSolved = updated.every(
      (piece, index) => piece === originalPieces[index]
    );

    if (isSolved) {
      setSolved(true);
      setTimerStarted(false);

      let updatedBestMoves = bestMoves;
      let updatedBestTime = bestTime;

      if (bestMoves === null || newMoves < bestMoves) {
        updatedBestMoves = newMoves;
        setBestMoves(newMoves);
        localStorage.setItem("bestMoves", newMoves);
      }

      if (bestTime === null || seconds < bestTime) {
        updatedBestTime = seconds;
        setBestTime(seconds);
        localStorage.setItem("bestTime", seconds);
      }

      setTimeout(() => {
        navigate("/result", {
          state: {
            originalImage,
            moves: newMoves,
            time: formattedTime,
            difficulty:
              location.state?.difficulty ||
              JSON.parse(localStorage.getItem("puzzleData"))?.difficulty,

            bestMoves: updatedBestMoves,
            bestTime:
              updatedBestTime !== null
                ? `${String(Math.floor(updatedBestTime / 60)).padStart(2, "0")}:${String(updatedBestTime % 60).padStart(2, "0")}`
                : "--:--",
          },
        });
      }, 500);
    }
  }

  useEffect(() => {
    if (solved || pieces.length !== totalPieces) return;

    const wasPinching = previousPinchRef.current;
    const isPinching = gesture.pinching;

    if (!wasPinching && isPinching) {
      if (hoveredIndex !== -1) {
        setSelectedIndex(hoveredIndex);
        pickupAudio.current.currentTime = 0;
        pickupAudio.current.play();

        const tileCol = hoveredIndex % grid;
        const tileRow = Math.floor(hoveredIndex / grid);

        const tileLeft = tileCol * tileSize;
        const tileTop = tileRow * tileSize;

        setGripOffset({
          x: cursorX - tileLeft,
          y: cursorY - tileTop,
        });
      }
    }

    if (wasPinching && !isPinching) {
      if (selectedIndex !== null && hoveredIndex !== -1) {
        dropAudio.current.currentTime = 0;
        dropAudio.current.play();
        swapPieces(selectedIndex, hoveredIndex);
      }

      setSelectedIndex(null);
      setGripOffset({ x: 90, y: 90 });
    }

    previousPinchRef.current = isPinching;
  }, [gesture.pinching, hoveredIndex, selectedIndex, solved, pieces]);

  function handleDragStart(index) {
    if (solved || pieces.length !== totalPieces) return;
    pickupAudio.current.currentTime = 0;
    pickupAudio.current.play().catch(() => {});
    setDraggedIndex(index);
  }

  function handleDrop(dropIndex) {
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    dropAudio.current.currentTime = 0;
    dropAudio.current.play().catch(() => {});

    swapPieces(draggedIndex, dropIndex);
    setDraggedIndex(null);
  }

  function restartPuzzle() {
    if (originalPieces.length !== totalPieces) {
      navigate("/camera");
      return;
    }

    const shuffled = [...originalPieces];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setPieces(shuffled);
    setMoves(0);
    setSeconds(0);
    setTimerStarted(false);
    setSolved(false);
    setDraggedIndex(null);
    setHoveredIndex(-1);
    setSelectedIndex(null);
    setGripOffset({ x: 90, y: 90 });
    setShowCamera(true);
    previousPinchRef.current = false;
  }

  function goHome() {
    setShowCamera(false);

    setGesture({
      x: 0,
      y: 0,
      pinching: false,
    });

    setTimeout(() => {
      navigate("/");
    }, 50);
  }

  function goCamera() {
    localStorage.removeItem("puzzleData");
    navigate("/camera");
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-sky-200 via-sky-400 to-blue-500 text-slate-900 px-6 py-4">
      <DashboardHeader moves={moves} time={formattedTime} gesture={gesture} bestMoves={bestMoves} bestTime={formattedBestTime} />

      <main className="mt-4 flex justify-center items-start gap-6">
        <div className="relative">
          <PuzzleBoard
            grid={grid}
            solved={solved}
            originalImage={originalImage}
            pieces={pieces}
            originalPieces={originalPieces}
            hoveredIndex={hoveredIndex}
            selectedIndex={selectedIndex}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onCaptureAgain={goCamera}
          />

          <FloatingTile
            piece={floatingPiece}
            x={cursorX}
            y={cursorY}
            visible={gesture.pinching && selectedIndex !== null}
            gripOffset={gripOffset}
            size={tileSize}
          />

          <VirtualCursor
            x={cursorX}
            y={cursorY}
            visible={!solved && pieces.length === totalPieces}
            pinching={gesture.pinching}
          />
        </div>

        {showCamera && <CameraPanel onGesture={setGesture} />}
      </main>

      {solved && (
        <h2 className="text-green-400 text-2xl font-bold mt-3 text-center">
          🎉 Puzzle Solved!
        </h2>
      )}

      <div className="mt-4">
        <ControlBar onRestart={restartPuzzle} onHome={goCamera} />
      </div>

    </div>
  );
}