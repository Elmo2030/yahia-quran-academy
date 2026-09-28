/**
 * POST /api/client-error — the browser's error reports (audit OB-01).
 *
 * There was an error boundary but nothing told anyone a page had broken. The
 * browser now posts a small report here; this logs one structured line, which
 * Cloudflare keeps in the Pages function logs (Workers & Pages → project →
 * Functions → Logs, or `wrangler pages deployment tail`). Nothing is stored,
 * and anything that looks like an email address or a token is redacted first:
 * the people using this site are children.
 */
const MAX_BYTES = 8 * 1024;

const redact = (value: unknown, max: number) =>
  String(value ?? "")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]")
    .replace(/(access_token|refresh_token|token|code|key)=[^&\s"']+/gi, "$1=[redacted]")
    .replace(/eyJ[\w-]+\.[\w-]+\.[\w-]+/g, "[jwt]")
    .slice(0, max);

export const onRequest = async ({ request }: { request: Request }): Promise<Response> => {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { allow: "POST" } });
  }
  const body = await request.text();
  if (body.length > MAX_BYTES) return new Response(null, { status: 413 });

  let report: Record<string, unknown>;
  try {
    report = JSON.parse(body);
    if (!report || typeof report !== "object") throw new Error("not an object");
  } catch {
    return new Response(null, { status: 400 });
  }

  const path = redact(report.path, 300).split("?")[0];
  console.error(JSON.stringify({
    type: "client-error",
    kind: redact(report.kind, 20) || "unknown",
    message: redact(report.message, 500),
    stack: redact(report.stack, 2000),
    path,
    userAgent: redact(request.headers.get("user-agent"), 200),
    at: new Date().toISOString(),
  }));
  return new Response(null, { status: 204 });
};
