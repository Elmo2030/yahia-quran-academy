import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

vi.mock("@/hooks/useAuth", () => ({
  default: () => ({ session: null, profile: null }),
  useAuth: () => ({ session: null, profile: null }),
}));

import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import SeerahDetail from "./SeerahDetail";

function renderDetail() {
  return render(<ThemeProvider><LocaleProvider><SeerahDetail /></LocaleProvider></ThemeProvider>);
}

describe("Station 1 Seerah content pilot", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, "", "/seerah/little-shepherd");
  });

  it("shows the reviewed Arabic pilot narrative for a Station 1 story", () => {
    renderDetail();

    expect(screen.getByRole("heading", { name: "راعي الغنم" })).toBeTruthy();
    expect(screen.getByText("صحيح البخاري 2262")).toBeTruthy();
    expect(screen.getByText(/كان محمد ﷺ يرعى الغنم لأهلها على قراريط/)).toBeTruthy();
    expect(screen.getByText(/المسؤولية تنمو عندما نعتني/)).toBeTruthy();
    expect(screen.queryByRole("button", { name: "٦–٨ سنوات" })).toBeNull();
  });

  it("reveals the existing keepsake only after the pilot story question is answered", () => {
    renderDetail();

    expect(screen.queryByText("عصا الراعي")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "رعي الأغنام" }));

    expect(screen.getByText("عصا الراعي")).toBeTruthy();
    expect(screen.getByRole("img", { name: "مكافأتك: الراعي المسؤول" })).toBeTruthy();
  });

  it("keeps the existing English record until the pilot receives a reviewed translation", () => {
    window.history.pushState({}, "", "/seerah/little-shepherd?lang=en");
    renderDetail();

    expect(screen.getByRole("heading", { name: "The Little Shepherd" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "راعي الغنم" })).toBeNull();
  });

  it("renders the Station 2 narrative with its learning and source layers", () => {
    window.history.pushState({}, "", "/seerah/cave-of-hira");
    renderDetail();

    expect(screen.getByRole("heading", { name: "الخلوة في غار حراء" })).toBeTruthy();
    expect(screen.getByText(/حُببت إلى محمد ﷺ الخلوة/)).toBeTruthy();
    expect(screen.getByText("حديث عائشة رضي الله عنها في بدء الوحي")).toBeTruthy();
    expect(screen.getByText(/الهدوء والعبادة يساعداننا/)).toBeTruthy();
  });

  it("renders the Station 3 revelation narrative from Quran and Sunnah references", () => {
    window.history.pushState({}, "", "/seerah/revelation-iqra");
    renderDetail();

    expect(screen.getByRole("heading", { name: "أول الوحي: اقرأ" })).toBeTruthy();
    expect(screen.getByText(/جاءه جبريل عليه السلام/)).toBeTruthy();
    expect(screen.getByText("سورة العلق 96:1–5")).toBeTruthy();
    expect(screen.getByText(/العلم يبدأ باسم الله/)).toBeTruthy();
  });

  it("renders the Station 4 narrative with its visible trusted source", () => {
    window.history.pushState({}, "", "/seerah/journey-to-taif");
    renderDetail();

    expect(screen.getByRole("heading", { name: "رحلة الطائف" })).toBeTruthy();
    expect(screen.getByText(/اختار الرحمة والرجاء بدل الانتقام/)).toBeTruthy();
    expect(screen.getByText("صحيح البخاري وصحيح مسلم")).toBeTruthy();
  });

  it("renders the Station 5 Night Journey narrative from Quran and sound hadith", () => {
    window.history.pushState({}, "", "/seerah/the-great-gift-prayer");
    renderDetail();

    expect(screen.getByRole("heading", { name: "الهدية الكبرى: الصلاة" })).toBeTruthy();
    expect(screen.getByText(/فرض الله الصلاة في ليلة المعراج/)).toBeTruthy();
    expect(screen.getByText("صحيح البخاري ومسلم")).toBeTruthy();
  });
});
