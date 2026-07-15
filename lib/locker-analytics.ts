const VIEW_PREFIX = "locker_view_";
const UNLOCK_PREFIX = "locker_unlock_";

export function hasTrackedView(lockerId: string): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(`${VIEW_PREFIX}${lockerId}`) === "1";
}

export function markViewTracked(lockerId: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(`${VIEW_PREFIX}${lockerId}`, "1");
}

export function hasTrackedUnlock(lockerId: string): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(`${UNLOCK_PREFIX}${lockerId}`) === "1";
}

export function markUnlockTracked(lockerId: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(`${UNLOCK_PREFIX}${lockerId}`, "1");
}

export function getLockerSessionId(lockerId: string): string {
  const key = `locker_session_${lockerId}`;
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
}
