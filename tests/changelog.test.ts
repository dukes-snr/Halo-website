import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import {
  VISIBLE_ITEMS_PER_GROUP,
  publishedReleases,
  releaseCards,
  sliceSection,
  type ChangelogFeed,
} from "../lib/changelog.ts";

const feedPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "lib", "data", "changelog.json");
const feed = JSON.parse(readFileSync(feedPath, "utf8")) as ChangelogFeed;

test("omits unpublished Unreleased and keeps newest-first 0.x diary", () => {
  const published = publishedReleases(feed);
  assert.ok(published.length > 0);
  assert.equal(
    published.some((r) => r.published === false),
    false,
  );
  assert.equal(
    published.some((r) => String(r.version).toLowerCase() === "unreleased"),
    false,
  );
  const versions = published.map((r) => r.version);
  assert.equal(versions[0], "0.10.0");
  assert.ok(versions.includes("0.1.0"));
  assert.equal(versions[versions.length - 1], "0.1.0");
  versions.forEach((version) => {
    assert.match(String(version), /^0\./);
  });
});

test("caps each section at 5 visible bullets with overflow behind Show more", () => {
  const cards = releaseCards(feed);
  const v010 = cards.find((c) => c.version === "0.10.0");
  const v01 = cards.find((c) => c.version === "0.1.0");
  assert.ok(v010, "0.10.0 must appear");
  assert.ok(v01, "0.1.0 must appear");

  cards.forEach((card) => {
    (card.sections || []).forEach((section) => {
      assert.ok(section.visible.length <= VISIBLE_ITEMS_PER_GROUP);
      const total = section.visible.length + section.overflow.length;
      if (total > VISIBLE_ITEMS_PER_GROUP) {
        assert.equal(section.visible.length, VISIBLE_ITEMS_PER_GROUP);
        assert.equal(section.hasMore, true);
        assert.ok(section.overflow.length > 0);
      } else {
        assert.equal(section.hasMore, false);
        assert.equal(section.overflow.length, 0);
      }
    });
  });

  const longSection = v01.sections.find((s) => s.title === "New Features");
  assert.ok(longSection);
  assert.equal(longSection.visible.length, 5);
  assert.ok(longSection.overflow.length > 0);
  assert.equal(longSection.hasMore, true);
});

test("VISIBLE_ITEMS_PER_GROUP is 5 to match the diary contract", () => {
  assert.equal(VISIBLE_ITEMS_PER_GROUP, 5);
  const slice = sliceSection({ title: "New Features", items: ["a", "b", "c", "d", "e", "f"] });
  assert.deepEqual(slice.visible, ["a", "b", "c", "d", "e"]);
  assert.deepEqual(slice.overflow, ["f"]);
  assert.equal(slice.hasMore, true);
});
