export default function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-soft flex flex-col gap-4 animate-pulse">
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2 w-2/3">
          <div className="h-4 bg-muted/20 rounded w-1/4"></div>
          <div className="h-6 bg-muted/20 rounded w-3/4"></div>
          <div className="h-4 bg-muted/20 rounded w-1/2 mt-1"></div>
        </div>
        
        <div className="h-12 w-12 rounded border border-border bg-muted/10"></div>
      </div>

      {/* Meta Information */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-3 bg-muted/10 rounded w-1/2"></div>
            <div className="h-4 bg-muted/20 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Footer / Tags */}
      <div className="flex items-center justify-between mt-2 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 w-1/3">
          <div className="h-6 bg-muted/20 rounded w-1/2"></div>
          <div className="h-4 bg-muted/10 rounded w-1/3"></div>
        </div>
        
        <div className="h-4 bg-muted/20 rounded w-24"></div>
      </div>
    </div>
  );
}
