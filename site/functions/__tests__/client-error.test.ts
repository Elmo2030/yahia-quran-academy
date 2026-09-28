// @vitest-environment node
/**
 * Front-end errors must reach someone (audit OB-01). The browser posts a
 * small report here; the function logs one structured, redacted line that
 * shows up in Cloudflare's function logs.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { onRequest } from "../api/client-error";

const post = (body: string, headers: Record<string, string> = { "content-type": "application/json" }) =>
  onRequest({ request: new Request("https://yahyaquran.com/api/client-error", { method: "POST", body, headers }) } as never);

afterEach(() => vi.restoreAllMocks());

describe("client error reports", () => {
  it("logs one redacted line and answers 204", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await post(JSON.stringify({
      message: "TypeError: x is undefined for kid@family.com",
      stack: "at Page (https://yahyaquran.com/assets/index.js:1:2)",
      path: "/hifz/1?access_token=secret-token&x=1",
      kind: "boundary",
    }));
    expect(res.status).toBe(204);
    expect(log).toHaveBeenCalledTimes(1);
    const line = JSON.parse(String(log.mock.calls[0][0]));
    expect(line).toMatchObject({ type: "client-error", kind: "boundary", path: "/hifz/1" });
    expect(JSON.stringify(line)).not.toContain("kid@family.com");
    expect(JSON.stringify(line)).not.toContain("secret-token");
  });

  it("accepts POST only", async () => {
    const res = await onRequest({ request: new Request("https://yahyaquran.com/api/client-error") } as never);
    expect(res.status).toBe(405);
  });

  it("refuses oversized and malformed reports without logging them", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await post("x".repeat(9000))).status).toBe(413);
    expect((await post("{not json")).status).toBe(400);
    expect(log).not.toHaveBeenCalled();
  });
});
