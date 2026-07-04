import PuzzlePiece from "./PuzzlePiece";

export default function PuzzleBoard({
  solved,
  originalImage,
  pieces = [],
  originalPieces = [],
  hoveredIndex = -1,
  selectedIndex = null,
  grid = 3,
  onDragStart,
  onDrop,
  onCaptureAgain,
}) {
  const displayPieces = solved ? originalPieces : pieces;
  const totalPieces = grid * grid;
  const boardSize = 540;
  const tileSize = boardSize / grid;

  return (
    <div className="bg-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl p-4">
      <div className="overflow-hidden rounded-2xl border-2 border-blue-500">
        {solved && originalImage ? (
          <img
            src={originalImage}
            alt="Solved Puzzle"
            style={{
              width: `${boardSize}px`,
              height: `${boardSize}px`,
            }}
            className="object-cover"
          />
        ) : displayPieces.length === totalPieces ? (
          <div
            className="bg-white/20 backdrop-blur-xl rounded-2xl overflow-visible"
            style={{
              width: `${boardSize }px`,
              height: `${boardSize }px`,
              display: "grid",
              gridTemplateColumns: `repeat(${grid}, ${tileSize}px)`,
              gridTemplateRows: `repeat(${grid}, ${tileSize}px)`,
            }}
          >
            {displayPieces.map((piece, index) => (
              <PuzzlePiece
                key={index}
                piece={piece}
                index={index}
                solved={solved}
                hovered={index === hoveredIndex}
                selected={index === selectedIndex}
                size={tileSize}
                onDragStart={onDragStart}
                onDrop={onDrop}
              />
            ))}
          </div>
        ) : (
          <div className="w-[540px] h-[540px] flex flex-col items-center justify-center bg-slate-950 text-center px-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">
              No Puzzle Loaded
            </h2>

            <button
              onClick={onCaptureAgain}
              className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold"
            >
              📷 Capture Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}