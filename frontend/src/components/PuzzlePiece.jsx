export default function PuzzlePiece({
  piece,
  index,
  solved,
  hovered,
  selected,
  size = 180,
  onDragStart,
  onDrop,
}) {
  return (
    <div
      draggable={!solved}
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(index)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={`
        relative
        overflow-hidden
        rounded-2xl
        transition-all
        duration-200
        select-none

        ${
          selected
            ? "z-50 scale-110 -translate-y-2 ring-4 ring-green-400 shadow-[0_0_40px_rgba(34,197,94,0.9)]"
            : hovered
            ? "z-30 scale-[1.03] ring-4 ring-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)]"
            : "z-10"
        }
      `}
    >
      <img
        src={piece}
        alt=""
        draggable={false}
        className={`
          w-full
          h-full
          object-cover
          rounded-2xl
          transition-all
          duration-200
          ${selected ? "opacity-20" : "opacity-100"}
        `}
      />
    </div>
  );
}