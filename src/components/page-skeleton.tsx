export function PageSkeleton({ cards = 1 }: { cards?: number }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="animate-pulse rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="h-4 w-32 rounded-full bg-slate-200" />
        <div className="mt-4 h-8 w-2/3 rounded-2xl bg-slate-200" />
        <div className="mt-3 h-4 w-full rounded-full bg-slate-100" />
        <div className="mt-2 h-4 w-5/6 rounded-full bg-slate-100" />
      </div>

      <div className={`mt-8 grid gap-6 ${cards > 1 ? 'md:grid-cols-2 xl:grid-cols-3' : ''}`}>
        {Array.from({ length: cards }).map((_, index) => (
          <div key={index} className="animate-pulse overflow-hidden rounded-[1.9rem] border border-white/80 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <div className="aspect-[4/3] bg-slate-200" />
            <div className="p-6">
              <div className="h-4 w-20 rounded-full bg-slate-200" />
              <div className="mt-3 h-6 w-2/3 rounded-2xl bg-slate-200" />
              <div className="mt-4 h-4 w-full rounded-full bg-slate-100" />
              <div className="mt-2 h-4 w-5/6 rounded-full bg-slate-100" />
              <div className="mt-6 h-10 w-32 rounded-full bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}