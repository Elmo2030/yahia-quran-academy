/**
 * Sends front-end errors to /api/client-error (functions/api/client-error.ts)
 * so a broken page is noticed by someone other than the child looking at it.
 * Each distinct error is sent once, at most five per page load, and only the
 * message, stack and path travel — never form values or storage.
 */
const ENDPOINT = "/api/client-error";
const MAX_PER_PAGE = 5;
let sent = new Set<string>();

export function reportError(error: unknown, kind: "boundary" | "window" | "promise") {
  try {
    const err = error instanceof Error ? error : new Error(String(error));
    const message = `${err.name}: ${err.message}`;
    if (sent.has(message) || sent.size >= MAX_PER_PAGE) return;
    sent.add(message);
    const body = JSON.stringify({ message, stack: err.stack ?? "", path: window.location.pathname, kind });
    const blob = new Blob([body], { type: "application/json" });
    if (typeof navigator.sendBeacon === "function" && navigator.sendBeacon(ENDPOINT, blob)) return;
    void fetch(ENDPOINT, { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true }).catch(() => {});
  } catch {
    // Reporting must never become a second error.
  }
}

/** Uncaught errors and rejections anywhere on the page. */
export function installGlobalErrorReporting() {
  window.addEventListener("error", (event) => reportError(event.error ?? event.message, "window"));
  window.addEventListener("unhandledrejection", (event) => reportError(event.reason, "promise"));
}

export function resetErrorReportingForTests() {
  sent = new Set();
}
