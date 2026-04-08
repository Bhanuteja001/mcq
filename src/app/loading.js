export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-slate-900/90 shadow-2xl border border-white/10">
        <div className="h-16 w-16 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
        <div className="text-center">
          <p className="text-xl font-semibold">Loading page...</p>
          <p className="text-sm text-slate-300">
            Please wait while we prepare the content.
          </p>
        </div>
      </div>
    </div>
  );
}
