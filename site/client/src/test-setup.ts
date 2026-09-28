// =============================================================================
// Vitest setup for component tests.
//
// React Testing Library only auto-cleans between tests when vitest globals are
// enabled; this project does not enable them, so without the explicit cleanup
// below every render stacks into the same document and the second test in a
// file fails with "found multiple elements by data-testid".
// =============================================================================

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

// jsdom implements no scrolling, so a component that brings its own panel into
// view — the facts quiz does, because on a phone it opened below the fold —
// throws "scrollIntoView is not a function" the moment it mounts.
// Database tests run in the node environment, where there is no Element.
if (typeof Element !== "undefined" && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
