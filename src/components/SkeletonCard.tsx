export default function SkeletonCard() {
  return (
    <div className="bg-card border border-border/80 rounded-2xl p-5 md:p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-5 relative overflow-hidden pointer-events-none">
      {/* Animated Shimmer Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-muted/5 to-transparent z-10" />

      {/* Top Section */}
      <div className="flex items-start justify-between relative z-0">
        <div className="flex flex-col gap-3 w-2/3 pr-4">
          <div className="h-6 bg-muted/10 rounded-md w-3/4 animate-pulse"></div>
          <div className="h-4 bg-muted/10 rounded-md w-1/2 animate-pulse"></div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="h-8 w-8 rounded-full bg-muted/10 animate-pulse hidden sm:block"></div>
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl border border-border/50 bg-muted/10 flex-shrink-0 animate-pulse"></div>
        </div>
      </div>

      {/* Meta Information Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-1 bg-muted/5 p-4 rounded-xl border border-border/50 relative z-0">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col gap-2.5">
            <div className="h-3 bg-muted/10 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-muted/10 rounded w-3/4 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Footer / Tags */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-4 relative z-0">
        <div className="flex items-center gap-3 w-1/2 sm:w-1/3">
          <div className="h-7 bg-muted/10 rounded-lg w-2/3 animate-pulse"></div>
          <div className="h-4 bg-muted/10 rounded w-1/3 animate-pulse"></div>
        </div>
        
        <div className="h-11 bg-muted/10 rounded-xl w-full sm:w-32 animate-pulse"></div>
      </div>
    </div>
  );
}
