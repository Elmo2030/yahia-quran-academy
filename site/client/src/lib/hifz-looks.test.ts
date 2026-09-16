import { describe, expect, it } from "vitest";

import { DEFAULT_LOOKS, FRAMES, MAX_STICKERS, STICKERS, lookName, parseLooks } from "./hifz-looks";
import { createProfile, emptyStore, parseStore, toggleSticker, updateLooks } from "./hifz-store";

const withChild = () => {
  const made = createProfile(emptyStore(), { name: "يحيى", character: "yahya" });
  if (!made.ok) throw new Error("the test profile did not make it");
  return { store: made.store, id: made.profile.id };
};

describe("parseLooks", () => {
  it("starts a child with nothing chosen", () => {
    expect(parseLooks(undefined)).toEqual(DEFAULT_LOOKS);
    expect(parseLooks("gold")).toEqual(DEFAULT_LOOKS);
  });

  it("keeps what is in the catalogue and drops what is not", () => {
    expect(parseLooks({ frame: "gold", card: "night", pet: "camel" })).toEqual({
      frame: "gold", card: "night", pet: "camel", stickers: [],
    });
    // A frame id in the card's place is still not a card.
    expect(parseLooks({ frame: "diamond", card: "gold", pet: "dragon" })).toEqual(DEFAULT_LOOKS);
  });

  it("never lets the shelf hold a sticker twice, or more than there are", () => {
    expect(parseLooks({ stickers: ["moon", "moon", "palm"] }).stickers).toEqual(["moon", "palm"]);
    const many = [...STICKERS.map(s => s.id), "moon", "palm"];
    expect(parseLooks({ stickers: many }).stickers).toHaveLength(MAX_STICKERS);
  });
});

describe("choosing", () => {
  it("sets a look and clears it again", () => {
    const { store, id } = withChild();
    const dressed = updateLooks(store, id, { frame: FRAMES[0].id });
    expect(dressed.profiles[0].looks.frame).toBe(FRAMES[0].id);
    expect(updateLooks(dressed, id, { frame: null }).profiles[0].looks.frame).toBeNull();
  });

  it("puts a sticker on the shelf and takes it off", () => {
    const { store, id } = withChild();
    const on = toggleSticker(store, id, "moon");
    expect(on.profiles[0].looks.stickers).toEqual(["moon"]);
    expect(toggleSticker(on, id, "moon").profiles[0].looks.stickers).toEqual([]);
  });

  it("ignores a sticker that does not exist", () => {
    const { store, id } = withChild();
    expect(toggleSticker(store, id, "rocket").profiles[0].looks.stickers).toEqual([]);
  });

  it("survives a round trip through storage", () => {
    const { store, id } = withChild();
    const dressed = toggleSticker(updateLooks(store, id, { card: "night", pet: "cat" }), id, "dove");
    const back = parseStore(JSON.parse(JSON.stringify(dressed)));
    expect(back.profiles[0].looks).toEqual({ frame: null, card: "night", pet: "cat", stickers: ["dove"] });
  });
});

describe("names", () => {
  it("answers in the reader's language, and falls back to the id", () => {
    expect(lookName("frame", "gold", "ar")).toBe("الذهبي");
    expect(lookName("frame", "gold", "en")).toBe("Gold");
    expect(lookName("frame", "unknown", "ar")).toBe("unknown");
  });
});
