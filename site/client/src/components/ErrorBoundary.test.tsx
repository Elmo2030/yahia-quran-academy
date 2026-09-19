import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ErrorBoundary from "./ErrorBoundary";
import { LocaleProvider } from "@/contexts/LocaleContext";

function BrokenScreen(): never {
  throw new Error("internal-only diagnostic");
}

describe("ErrorBoundary", () => {
  it("shows a localized recovery message without exposing implementation details", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

    render(<LocaleProvider><ErrorBoundary><BrokenScreen /></ErrorBoundary></LocaleProvider>);

    expect(screen.getByRole("alert")).toHaveTextContent("حصلت مشكلة مؤقتة");
    expect(screen.getByRole("button", { name: "تحديث الصفحة" })).toBeVisible();
    expect(screen.queryByText("internal-only diagnostic")).not.toBeInTheDocument();

    consoleError.mockRestore();
  });
});
