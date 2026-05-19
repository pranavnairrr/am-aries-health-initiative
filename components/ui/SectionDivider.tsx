export default function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px w-16 bg-gold-primary opacity-50" />
      <span className="text-gold-primary text-base leading-none">◆</span>
      <div className="h-px w-16 bg-gold-primary opacity-50" />
    </div>
  );
}
