import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { StoryPicture } from "@/components/StoryPicture";

describe("StoryPicture loading priority", () => {
  it("fetches the above-the-fold picture first", () => {
    const { container } = render(<StoryPicture src="/stories/x.jpg" alt="" sizes="100vw" width={10} height={10} eager />);
    const img = container.querySelector("img")!;
    expect(img.getAttribute("loading")).toBe("eager");
    expect(img.getAttribute("fetchpriority")).toBe("high");
  });

  it("leaves every other picture lazy and unprioritised", () => {
    const { container } = render(<StoryPicture src="/stories/x.jpg" alt="" sizes="100vw" width={10} height={10} />);
    const img = container.querySelector("img")!;
    expect(img.getAttribute("loading")).toBe("lazy");
    expect(img.getAttribute("fetchpriority")).toBeNull();
  });

  it("marks the story page's hero art as the eager picture (it is the page's largest paint)", () => {
    const page = readFileSync(join(process.cwd(), "client/src/pages/SeerahDetail.tsx"), "utf8");
    const hero = page.slice(page.indexOf('className="story-detail-hero"'), page.indexOf("</section>", page.indexOf('className="story-detail-hero"')));
    expect(hero).toMatch(/<SeerahArt[^>]*\beager\b/);
  });
});
