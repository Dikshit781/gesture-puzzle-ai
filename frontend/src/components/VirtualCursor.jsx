export default function VirtualCursor({
  x,
  y,
  visible,
  pinching,
}) {
  if (!visible) return null;

  return (
    <div
      className="
        absolute
        z-[1000]
        pointer-events-none
        select-none
        text-5xl
      "
      style={{
        left: x - 22,
        top: y - 22,
      }}
    >
      {pinching ? "🤏🏻" : "🤚🏻"}
    </div>
  );
}