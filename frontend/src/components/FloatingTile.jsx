export default function FloatingTile({
  piece,
  x,
  y,
  visible,
  gripOffset,
  size = 180,
}) {
  if (!visible || !piece) return null;

  const gripX = gripOffset?.x ?? size / 2;
  const gripY = gripOffset?.y ?? size / 2;

  return (
    <div
      className="
        absolute
        z-[999]
        rounded-2xl
        overflow-hidden
        pointer-events-none
        shadow-2xl
        shadow-green-500/70
        ring-4
        ring-green-400
        scale-105
      "
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: x - gripX,
        top: y - gripY,
      }}
    >
      <img
        src={piece}
        alt="Floating Tile"
        draggable={false}
        className="w-full h-full object-cover select-none rounded-2xl"
      />
    </div>
  );
}