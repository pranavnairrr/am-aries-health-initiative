type Position = "tl" | "tr" | "bl" | "br";

const rotations: Record<Position, number> = {
  tl: 0,
  tr: 90,
  br: 180,
  bl: 270,
};

export default function GeometricCorner({
  position,
  size = 200,
  opacity = 0.22,
}: {
  position: Position;
  size?: number;
  opacity?: number;
}) {
  const id = `geo-${position}`;
  const rotation = rotations[position];
  const posStyle: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    opacity,
    pointerEvents: "none",
    ...(position.includes("t") ? { top: 0 } : { bottom: 0 }),
    ...(position.includes("l") ? { left: 0 } : { right: 0 }),
    transform: `rotate(${rotation}deg)`,
    transformOrigin: position.includes("t")
      ? position.includes("l") ? "top left" : "top right"
      : position.includes("l") ? "bottom left" : "bottom right",
  };

  return (
    <div style={posStyle}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <defs>
          <pattern
            id={id}
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            {/* Outer octagon */}
            <polygon
              points="12,0 28,0 40,12 40,28 28,40 12,40 0,28 0,12"
              fill="none"
              stroke="#C5A55A"
              strokeWidth="0.7"
            />
            {/* 8-pointed star */}
            <polygon
              points="20,5 22.5,14.5 31,11 27,19 36,22.5 27,26 31,34 22.5,30.5 20,40 17.5,30.5 9,34 13,26 4,22.5 13,19 9,11 17.5,14.5"
              fill="none"
              stroke="#C5A55A"
              strokeWidth="0.5"
            />
            {/* Center rotated square */}
            <rect
              x="15"
              y="15"
              width="10"
              height="10"
              transform="rotate(45 20 20)"
              fill="none"
              stroke="#C5A55A"
              strokeWidth="0.5"
            />
            {/* Cross lines */}
            <line x1="20" y1="0" x2="20" y2="40" stroke="#C5A55A" strokeWidth="0.3" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="#C5A55A" strokeWidth="0.3" />
            <line x1="0" y1="0" x2="40" y2="40" stroke="#C5A55A" strokeWidth="0.3" />
            <line x1="40" y1="0" x2="0" y2="40" stroke="#C5A55A" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
