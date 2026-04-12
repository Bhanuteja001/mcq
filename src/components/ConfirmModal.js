"use client";

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">{title}</h2>
          <p className="text-sm text-slate-600 mb-6">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-2xl border cursor-pointer border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-2xl cursor-pointer bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
