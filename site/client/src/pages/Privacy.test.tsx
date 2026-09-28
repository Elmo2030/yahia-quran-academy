/**
 * The privacy page must describe what the site actually does (audit PR-01,
 * PR-04, PR-05): recordings stay on the device, what is kept in the browser,
 * children's profiles, the processors, retention and deletion, and a way to
 * reach someone without having an account.
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";

let locale: "ar" | "en" = "en";
vi.mock("@/contexts/LocaleContext", () => ({ useLocale: () => ({ locale }) }));
vi.mock("@/components/SiteChrome", () => ({ SiteChrome: () => null }));
vi.mock("@/components/SiteFooter", () => ({ SiteFooter: () => null }));

import Privacy from "@/pages/Privacy";

const text = () => document.body.textContent ?? "";

describe("privacy policy matches the product", () => {
  beforeEach(() => vi.unstubAllEnvs());

  it("no longer says voice recording is a future feature", () => {
    for (locale of ["en", "ar"] as const) {
      const { unmount } = render(<Privacy />);
      expect(text()).not.toMatch(/later release|إصدار لاحق/);
      unmount();
    }
  });

  it("covers recordings, on-device storage, children, processors, retention and deletion", () => {
    locale = "en";
    render(<Privacy />);
    const t = text();
    expect(t).toMatch(/microphone/i);
    expect(t).toMatch(/never (leave|uploaded)/i);
    expect(t).toMatch(/this device|your browser/i);
    expect(t).toMatch(/child/i);
    expect(t).toMatch(/Supabase/);
    expect(t).toMatch(/Cloudflare/);
    expect(t).toMatch(/delete/i);
    expect(t).toMatch(/until you delete/i);
  });

  it("gives visitors without an account a way to reach us when a contact address is configured", () => {
    vi.stubEnv("VITE_PRIVACY_CONTACT_EMAIL", "privacy@example.org");
    locale = "ar";
    const { container } = render(<Privacy />);
    expect(container.querySelector('a[href="mailto:privacy@example.org"]')).not.toBeNull();
  });
});
