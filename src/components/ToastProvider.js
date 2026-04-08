"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = "info") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts((prev) => [...prev, { id, message, type }]);

      window.setTimeout(() => removeToast(id), 4000);
    },
    [removeToast],
  );

  const toast = useMemo(
    () => ({
      success: (message) => addToast(message, "success"),
      error: (message) => addToast(message, "error"),
      info: (message) => addToast(message, "info"),
      warning: (message) => addToast(message, "warning"),
    }),
    [addToast],
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
        {toasts.map(({ id, message, type }) => (
          <div
            key={id}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto w-full max-w-sm rounded-2xl border px-4 py-3 shadow-2xl transition-all duration-300 ${
              type === "success"
                ? "bg-emerald-500/95 border-emerald-300 text-white"
                : type === "error"
                  ? "bg-rose-500/95 border-rose-300 text-white"
                  : type === "warning"
                    ? "bg-amber-500/95 border-amber-300 text-slate-950"
                    : "bg-slate-950/95 border-slate-700 text-white"
            }`}
          >
            <p className="text-sm font-medium">{message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
