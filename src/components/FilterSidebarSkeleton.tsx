export default function FilterSidebarSkeleton() {
  return (
    <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hidden lg:block w-72 flex-shrink-0 self-start sticky top-24 overflow-hidden relative pointer-events-none">
      {/* Animated Shimmer Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-muted/5 to-transparent z-10" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-6 w-24 bg-muted/10 rounded-md animate-pulse" />
      </div>

      {/* Mock Filter Sections */}
      {[1, 2, 3, 4].map((section) => (
        <div key={section} className="border-b border-border/50 pb-5 mb-5 last:border-0">
          <div className="h-5 w-32 bg-muted/10 rounded-md animate-pulse mb-4" />
          
          {/* Skeleton inputs/checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded bg-muted/10 animate-pulse" />
              <div className="h-4 w-24 bg-muted/10 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded bg-muted/10 animate-pulse" />
              <div className="h-4 w-20 bg-muted/10 rounded animate-pulse" />
            </div>
            {section % 2 === 0 && (
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 rounded bg-muted/10 animate-pulse" />
                <div className="h-4 w-28 bg-muted/10 rounded animate-pulse" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

