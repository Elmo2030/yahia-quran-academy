import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useAuth", () => ({ useAuth: () => ({ session: null }) }));

import { MobileMenu } from "./MobileMenu";
import { LocaleProvider } from "@/contexts/LocaleContext";

describe("MobileMenu", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  afterEach(() => vi.unstubAllGlobals());

  it("keeps keyboard focus inside its modal panel", () => {
    render(<LocaleProvider><MobileMenu /></LocaleProvider>);

    fireEvent.click(screen.getByRole("button", { name: "القائمة" }));
    const dialog = screen.getByRole("dialog", { name: "التنقل" });
    const close = within(dialog).getByRole("button", { name: "أغلق القائمة" });
    const account = within(dialog).getByRole("link", { name: "أنشئ حسابًا" });

    expect(close).toHaveFocus();
    fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
    expect(account).toHaveFocus();
    fireEvent.keyDown(dialog, { key: "Tab" });
    expect(close).toHaveFocus();
  });
});
