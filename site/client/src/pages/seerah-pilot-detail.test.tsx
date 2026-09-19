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

  it("shows the source-aware Arabic pilot narrative for a Station 1 story", async () => {
    renderDetail();

    expect(await screen.findByRole("heading", { name: "راعي الغنم" })).toBeTruthy();
    expect(screen.getByText("صحيح البخاري 2262")).toBeTruthy();
    expect(screen.getByText(/كان محمد ﷺ يرعى الغنم لأهلها على قراريط/)).toBeTruthy();
    expect(screen.getByText(/المسؤولية تنمو عندما نعتني/)).toBeTruthy();
    expect(screen.queryByRole("button", { name: "٦–٨ سنوات" })).toBeNull();
  });

  it("reveals the existing keepsake only after the pilot story question is answered", async () => {
    renderDetail();

    expect(screen.queryByText("عصا الراعي")).toBeNull();
    fireEvent.click(await screen.findByRole("button", { name: "رعي الأغنام" }));

    expect(screen.getByText("عصا الراعي")).toBeTruthy();
    expect(screen.getByRole("img", { name: "مكافأتك: الراعي المسؤول" })).toBeTruthy();
  });

  it("shows the source-aligned English record and awards the keepsake only after the answer", () => {
    window.history.pushState({}, "", "/seerah/little-shepherd?lang=en");
    renderDetail();

    expect(screen.getByRole("heading", { name: "The Shepherd" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "راعي الغنم" })).toBeNull();
    expect(screen.getByText(/This account is recorded in Sahih al-Bukhari 2262/)).toBeTruthy();
    expect(screen.queryByText(/green mountains|help his uncle|wolves/)).toBeNull();
    expect(screen.queryByText("The Shepherd's Staff")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Blacksmith" }));
    expect(screen.queryByText("The Shepherd's Staff")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Shepherd" }));
    expect(screen.getByText("The Shepherd's Staff")).toBeTruthy();
  });

  it("renders the Station 2 narrative with its learning and source layers", async () => {
    window.history.pushState({}, "", "/seerah/cave-of-hira");
    renderDetail();

    expect(await screen.findByRole("heading", { name: "الخلوة في غار حراء" })).toBeTruthy();
    expect(screen.getByText(/حُببت إلى محمد ﷺ الخلوة/)).toBeTruthy();
    expect(screen.getByText("حديث عائشة رضي الله عنها في بدء الوحي")).toBeTruthy();
    expect(screen.getByText(/الهدوء والعبادة يساعداننا/)).toBeTruthy();
  });

  it("renders the Station 3 revelation narrative from Quran and Sunnah references", async () => {
    window.history.pushState({}, "", "/seerah/revelation-iqra");
    renderDetail();

    expect(await screen.findByRole("heading", { name: "أول الوحي: اقرأ" })).toBeTruthy();
    expect(screen.getByText(/جاءه جبريل عليه السلام/)).toBeTruthy();
    expect(screen.getByText("سورة العلق 96:1–5")).toBeTruthy();
    expect(screen.getByText(/العلم يبدأ باسم الله/)).toBeTruthy();
  });

  it("renders the Station 4 narrative with its visible trusted source", async () => {
    window.history.pushState({}, "", "/seerah/journey-to-taif");
    renderDetail();

    expect(await screen.findByRole("heading", { name: "رحلة الطائف" })).toBeTruthy();
    expect(screen.getByText(/اختار الرحمة والرجاء بدل الانتقام/)).toBeTruthy();
    expect(screen.getByText("صحيح البخاري وصحيح مسلم")).toBeTruthy();
  });

  it("renders the Station 5 Night Journey narrative from Quran and sound hadith", async () => {
    window.history.pushState({}, "", "/seerah/the-great-gift-prayer");
    renderDetail();

    expect(await screen.findByRole("heading", { name: "الهدية الكبرى: الصلاة" })).toBeTruthy();
    expect(screen.getByText(/فرض الله الصلاة في ليلة المعراج/)).toBeTruthy();
    expect(screen.getByText("صحيح البخاري ومسلم")).toBeTruthy();
  });

  it("renders the Station 6 migration narrative with its hadith source", async () => {
    window.history.pushState({}, "", "/seerah/asma-that-al-nitaqayn");
    renderDetail();

    expect(await screen.findByRole("heading", { name: "أسماء ذات النطاقين" })).toBeTruthy();
    expect(screen.getByText(/جهزت أسماء بنت أبي بكر/)).toBeTruthy();
    expect(screen.getByText("صحيح البخاري")).toBeTruthy();
  });

  it("renders the Station 7 peace narrative from its Quran and hadith sources", async () => {
    window.history.pushState({}, "", "/seerah/hudaybiyyah-peace-treaty");
    renderDetail();

    expect(await screen.findByRole("heading", { name: "صلح الحديبية" })).toBeTruthy();
    expect(screen.getByText(/اختار الوفاء بالعهد/)).toBeTruthy();
    expect(screen.getByText("صحيح البخاري، خبر الحديبية.")).toBeTruthy();
  });

  it("renders the Station 8 ethics narrative with its sound hadith source", async () => {
    window.history.pushState({}, "", "/seerah/honest-merchant-market-ethics");
    renderDetail();

    expect(await screen.findByRole("heading", { name: "من غش فليس منا" })).toBeTruthy();
    expect(screen.getByText(/فأدخل يده فيه فوجد بللًا مخفيًا تحت الظاهر/)).toBeTruthy();
    expect(screen.getByText("صحيح مسلم، حديث صبرة الطعام: من غش فليس مني.")).toBeTruthy();
  });

  it("renders the Station 9 farewell narrative with its Quran and hadith sources", async () => {
    window.history.pushState({}, "", "/seerah/city-earthquake-abu-bakr-speech");
    renderDetail();

    expect(await screen.findByRole("heading", { name: "زلزال المدينة وثبات الصدّيق" })).toBeTruthy();
    expect(screen.getByText(/من كان يعبد محمدًا فإن محمدًا قد مات/)).toBeTruthy();
    expect(screen.getByText("القرآن الكريم: سورة آل عمران 3:144.")).toBeTruthy();
    expect(screen.getByText("صحيح البخاري، خطبة أبي بكر رضي الله عنه يوم وفاة النبي ﷺ.")).toBeTruthy();
  });
});
