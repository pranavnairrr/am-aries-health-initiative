export default function SpotCounter({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-coral font-semibold ${className}`}>
      2,500 seats — filling fast
    </p>
  );
}
