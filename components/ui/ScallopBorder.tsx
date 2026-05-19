export default function ScallopBorder({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute pointer-events-none ${className}`}
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
        width: "calc(100% - 40px)",
        height: "calc(100% - 40px)",
      }}
    >
      {/* Outer scallop — shallower arches so they don't crowd content */}
      <path
        d="M 5,5 L 44,5 C 47,5 50,10 50,10 C 50,10 53,5 56,5 L 95,5
           L 95,44 C 95,47 90,50 90,50 C 90,50 95,53 95,56 L 95,95
           L 56,95 C 53,95 50,90 50,90 C 50,90 47,95 44,95 L 5,95
           L 5,56 C 5,53 10,50 10,50 C 10,50 5,47 5,44 Z"
        fill="none"
        stroke="#C5A55A"
        strokeWidth="1.1"
      />
      {/* Inner line */}
      <path
        d="M 8,8 L 44,8 C 47,8 50,12.5 50,12.5 C 50,12.5 53,8 56,8 L 92,8
           L 92,44 C 92,47 87.5,50 87.5,50 C 87.5,50 92,53 92,56 L 92,92
           L 56,92 C 53,92 50,87.5 50,87.5 C 50,87.5 47,92 44,92 L 8,92
           L 8,56 C 8,53 12.5,50 12.5,50 C 12.5,50 8,47 8,44 Z"
        fill="none"
        stroke="#C5A55A"
        strokeWidth="0.35"
        opacity="0.55"
      />
    </svg>
  );
}
