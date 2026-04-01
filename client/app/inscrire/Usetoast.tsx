"use client";

import { useState, useCallback, useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

/* ── Types ─────────────────────────────────────────── */
type ToastKind = "success" | "error";

interface Toast {
  id: number;
  kind: ToastKind;
  message: string;
  exiting: boolean;
}

/* ── Hook ───────────────────────────────────────────── */
let _nextId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    /* 1. mark as exiting so the slide-out animation runs */
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    /* 2. remove from DOM after animation completes */
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 380);
  }, []);

  const show = useCallback(
    (kind: ToastKind, message: string, duration = 4500) => {
      const id = ++_nextId;
      setToasts((prev) => [...prev, { id, kind, message, exiting: false }]);
      const timer = setTimeout(() => dismiss(id), duration);
      return () => clearTimeout(timer);
    },
    [dismiss]
  );

  return { toasts, show, dismiss };
}

/* ── ToastItem ──────────────────────────────────────── */
function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: number) => void;
}) {
  const Icon = toast.kind === "success" ? CheckCircle : XCircle;

  return (
    <div
      className={`toast toast--${toast.kind}${toast.exiting ? " toast--exit" : ""}`}
      role={toast.kind === "error" ? "alert" : "status"}
    >
      <Icon className="toast-icon" size={20} strokeWidth={2} />
      <span className="toast-msg">{toast.message}</span>
      <button
        className="toast-close"
        onClick={() => onDismiss(toast.id)}
        aria-label="Fermer"
      >
        <X size={15} strokeWidth={2.5} />
      </button>
      <div className="toast-bar" />
    </div>
  );
}

/* ── ToastPortal ────────────────────────────────────── */
export function ToastPortal({
  toasts,
  dismiss,
}: {
  toasts: Toast[];
  dismiss: (id: number) => void;
}) {
  return (
    <div className="toast-portal" aria-live="polite">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
      ))}
    </div>
  );
}