// @vitest-environment node
import { describe, expect, it } from "vitest";
import type { ConfigEnv, PluginOption, UserConfig } from "vite";
import config from "../../vite.config";

const resolve = (command: ConfigEnv["command"]): UserConfig =>
  typeof config === "function" ? (config as (env: ConfigEnv) => UserConfig)({ command, mode: command === "build" ? "production" : "development" }) : config;
const names = (plugins: PluginOption[] | undefined): string[] =>
  (plugins ?? []).flat(Infinity as 1).map((p) => (p && typeof p === "object" && "name" in p ? String(p.name) : "")).filter(Boolean);

describe("production build configuration", () => {
  // The jsx-loc plugin stamps data-loc="client/src/<file>.tsx:<line>" on every
  // element — useful in an editor, but in production it publishes the source
  // tree's layout in every page and adds bytes to every bundle.
  it("does not ship source locations in production", () => {
    expect(names(resolve("build").plugins).filter((n) => n.includes("loc"))).toEqual([]);
  });

  it("keeps React and Tailwind in the production build", () => {
    const built = names(resolve("build").plugins).join(" ");
    expect(built).toMatch(/react/);
    expect(built).toMatch(/tailwind/);
  });
});
