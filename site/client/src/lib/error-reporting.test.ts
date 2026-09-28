import { beforeEach, describe, expect, it, vi } from "vitest";
import { reportError, resetErrorReportingForTests } from "@/lib/error-reporting";

describe("reportError", () => {
  const beacon = vi.fn(() => true);
  beforeEach(() => {
    resetErrorReportingForTests();
    beacon.mockClear();
    Object.defineProperty(navigator, "sendBeacon", { value: beacon, configurable: true });
  });

  it("sends a report to the site's own endpoint", async () => {
    reportError(new Error("boom"), "boundary");
    expect(beacon).toHaveBeenCalledTimes(1);
    const [url, blob] = beacon.mock.calls[0] as unknown as [string, Blob];
    expect(url).toBe("/api/client-error");
    const text = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.readAsText(blob);
    });
    expect(JSON.parse(text)).toMatchObject({ message: "Error: boom", kind: "boundary" });
  });

  it("sends the same error once and at most five per page", () => {
    reportError(new Error("same"), "window");
    reportError(new Error("same"), "window");
    for (let i = 0; i < 10; i++) reportError(new Error(`e${i}`), "window");
    expect(beacon).toHaveBeenCalledTimes(5);
  });
});
