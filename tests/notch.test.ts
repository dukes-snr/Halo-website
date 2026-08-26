import assert from "node:assert/strict";
import test from "node:test";
import { LANE_CLASSES, closeShelf, isMini, isOpen, openShelf, setLane } from "../lib/notch-mock.ts";

function fakeNotch(initial: string[]) {
  const set = new Set(initial);
  return {
    classList: {
      add(...names: string[]) {
        names.forEach((name) => set.add(name));
      },
      remove(...names: string[]) {
        names.forEach((name) => set.delete(name));
      },
      contains(name: string) {
        return set.has(name);
      },
    },
  };
}

test("open path leaves is-open and drops is-mini", () => {
  const el = fakeNotch(["is-filled", "is-mini"]);
  openShelf(el);
  assert.equal(isOpen(el), true);
  assert.equal(isMini(el), false);
  assert.equal(el.classList.contains("is-peek"), false);
});

test("close path returns to is-mini and clears open lanes", () => {
  const el = fakeNotch(["is-open", "is-tray", "is-queue", "is-filled"]);
  closeShelf(el);
  assert.equal(isMini(el), true);
  assert.equal(isOpen(el), false);
  ["is-tray", "is-widgets", "is-queue", "is-out", "is-cal"].forEach((name) => {
    assert.equal(el.classList.contains(name), false, name);
  });
});

test("lane toggles match the Droppy mock tray/widgets/queue classes", () => {
  const el = fakeNotch(["is-open"]);
  setLane(el, "is-tray");
  assert.equal(el.classList.contains("is-tray"), true);
  assert.equal(el.classList.contains("is-filled"), true);
  assert.equal(el.classList.contains("is-widgets"), false);

  setLane(el, "is-widgets");
  assert.equal(el.classList.contains("is-widgets"), true);
  assert.equal(el.classList.contains("is-tray"), false);

  setLane(el, "is-queue");
  assert.equal(el.classList.contains("is-queue"), true);
  assert.equal(el.classList.contains("is-widgets"), false);

  setLane(el, null);
  LANE_CLASSES.forEach((name) => {
    assert.equal(el.classList.contains(name), false, name);
  });
});
