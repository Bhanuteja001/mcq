"use client";
import { useState, useEffect } from "react";

export default function ScreenRestriction({ children }) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsDesktop( window.innerWidth >= 1100 && window.innerHeight >= 700);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMounted) return null;

  if (!isDesktop) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f172a] px-6 text-center text-white font-sans">
        <div className="max-w-md space-y-10">
          {/* Icon Illustration */}
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-3xl bg-indigo-500/20 blur-xl"></div>
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Desktop Experience Only
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              This application is designed specifically for high-resolution desktop environments to ensure full functionality and a premium exam experience.
            </p>
          </div>

          <div className="pt-6">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-slate-800/50 px-6 py-4 text-sm font-medium text-slate-300 ring-1 ring-inset ring-slate-700/50 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
              Minimum required width: <span className="text-white font-bold">1100px</span>
            </div>
            <p className="mt-4 text-xs text-slate-500 uppercase tracking-widest font-semibold">
              Current width: {Math.round(window.innerWidth)}px
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
