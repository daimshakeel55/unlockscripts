"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";

type ToastType = "success" | "error" | "info";

type ToastItem = {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
};

type ToastInput = {
  type?: ToastType;
  title: string;
  description?: string;
  duration?: number;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION = 4500;

const typeStyles: Record<
  ToastType,
  { icon: typeof CheckCircle2; accent: string; glow: string; ring: string }
> = {
  success: {
    icon: CheckCircle2,
    accent: "text-emerald-400",
    glow: "from-emerald-500/25 via-violet-500/10 to-transparent",
    ring: "ring-emerald-500/20",
  },
  error: {
    icon: XCircle,
    accent: "text-red-400",
    glow: "from-red-500/25 via-rose-500/10 to-transparent",
    ring: "ring-red-500/20",
  },
  info: {
    icon: Info,
    accent: "text-violet-400",
    glow: "from-violet-500/25 via-fuchsia-500/10 to-transparent",
    ring: "ring-violet-500/20",
  },
};

function ToastCard({
  item,
  onDismiss,
  reducedMotion,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
  reducedMotion: boolean;
}) {
  const style = typeStyles[item.type];
  const Icon = style.icon;

  return (
    <motion.div
      layout={!reducedMotion}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
      className={`pointer-events-auto relative w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#14141f] shadow-[0_20px_60px_rgba(0,0,0,0.55)] ring-1 backdrop-blur-xl ${style.ring}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.glow}`}
        aria-hidden="true"
      />
      <div className="relative flex gap-3 p-4">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 ${style.accent}`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">{item.title}</p>
          {item.description ? (
            <p className="mt-1 text-sm leading-relaxed text-gray-300">
              {item.description}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => onDismiss(item.id)}
          className="shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {!reducedMotion ? (
        <motion.div
          className={`h-0.5 origin-left bg-gradient-to-r ${
            item.type === "success"
              ? "from-emerald-400 to-violet-500"
              : item.type === "error"
                ? "from-red-400 to-rose-500"
                : "from-violet-400 to-fuchsia-500"
          }`}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: TOAST_DURATION / 1000, ease: "linear" }}
        />
      ) : null}
    </motion.div>
  );
}

function ToastViewport({
  toasts,
  dismiss,
  reducedMotion,
}: {
  toasts: ToastItem[];
  dismiss: (id: string) => void;
  reducedMotion: boolean;
}) {
  return (
    <div
      aria-label="Notifications"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[99999] flex flex-col items-center gap-3 px-4 sm:inset-x-auto sm:bottom-auto sm:right-6 sm:top-6 sm:items-end"
    >
      <AnimatePresence mode="sync">
        {toasts.map((item) => (
          <ToastCard
            key={item.id}
            item={item}
            onDismiss={dismiss}
            reducedMotion={reducedMotion}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    ({ type = "info", title, description, duration = TOAST_DURATION }: ToastInput) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;

      setToasts((current) => [...current.slice(-2), { id, type, title, description }]);

      const timer = setTimeout(() => dismiss(id), duration);
      timersRef.current.set(id, timer);
    },
    [dismiss]
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      toast,
      success: (title, description) => toast({ type: "success", title, description }),
      error: (title, description) => toast({ type: "error", title, description }),
      info: (title, description) => toast({ type: "info", title, description }),
    }),
    [toast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted
        ? createPortal(
            <ToastViewport
              toasts={toasts}
              dismiss={dismiss}
              reducedMotion={reducedMotion}
            />,
            document.body
          )
        : null}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
