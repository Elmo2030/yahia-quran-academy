import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const headers = readFileSync(join(root, "client/public/_headers"), "utf8");
const shell = readFileSync(join(root, "client/index.html"), "utf8");
const themeInit = readFileSync(join(root, "client/public/theme-init.js"), "utf8");
const gitignore = readFileSync(join(root, ".gitignore"), "utf8");
const authContext = readFileSync(join(root, "client/src/contexts/AuthContext.tsx"), "utf8");

describe("production security configuration", () => {
  it("keeps browser hardening headers strict without allowing eval", () => {
    expect(headers).toContain("Content-Security-Policy:");
    expect(headers).toContain("script-src-attr 'none'");
    expect(headers).toContain("object-src 'none'");
    expect(headers).toContain("frame-ancestors 'none'");
    expect(headers).not.toContain("'unsafe-eval'");
    expect(headers).toContain("X-Content-Type-Options: nosniff");
    expect(headers).toContain("Referrer-Policy: strict-origin-when-cross-origin");
  });

  it("uses a same-origin theme initializer instead of an inline script", () => {
    expect(shell).toContain('<script src="/theme-init.js"></script>');
    expect(shell).not.toMatch(/<script>\s*\/\/ Before first paint/);
    expect(themeInit).toContain('theme === "dark" || theme === "light"');
  });

  it("ignores environment files while preserving the documented template", () => {
    expect(gitignore).toMatch(/^\.env\.\*$/m);
    expect(gitignore).toMatch(/^!\.env\.example$/m);
  });

  it("keeps detailed authentication diagnostics out of production consoles", () => {
    expect(authContext).toMatch(/if \(import\.meta\.env\.DEV\) \{[\s\S]*console\.warn/);
  });
});
