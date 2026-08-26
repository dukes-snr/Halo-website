export const VISIBLE_ITEMS_PER_GROUP = 5;

export type ChangelogSection = {
  title: string;
  items: string[];
};

export type ChangelogRelease = {
  version: string;
  date: string | null;
  published?: boolean;
  headline?: string;
  summary?: string;
  screenshots?: { path: string; alt: string }[];
  sections?: ChangelogSection[];
};

export type ChangelogFeed = {
  visible_items_per_group?: number;
  releases?: ChangelogRelease[];
};

export type SectionView = {
  title: string;
  visible: string[];
  overflow: string[];
  hasMore: boolean;
};

export type ReleaseCard = {
  version: string;
  date: string | null;
  headline: string;
  summary?: string;
  screenshots: { path: string; alt: string }[];
  sections: SectionView[];
};

export function publishedReleases(feed: ChangelogFeed): ChangelogRelease[] {
  const releases = Array.isArray(feed.releases) ? feed.releases : [];
  return releases.filter((release) => release && release.published === true);
}

export function sliceSection(section: ChangelogSection | undefined, cap?: number): SectionView {
  const limit = cap == null ? VISIBLE_ITEMS_PER_GROUP : cap;
  const items = section && Array.isArray(section.items) ? section.items.slice() : [];
  return {
    title: section?.title ?? "",
    visible: items.slice(0, limit),
    overflow: items.slice(limit),
    hasMore: items.length > limit,
  };
}

export function releaseCards(feed: ChangelogFeed, cap?: number): ReleaseCard[] {
  return publishedReleases(feed).map((release) => ({
    version: release.version,
    date: release.date,
    headline: release.headline || release.version,
    summary: release.summary,
    screenshots: Array.isArray(release.screenshots) ? release.screenshots : [],
    sections: (release.sections || []).map((section) => sliceSection(section, cap)),
  }));
}
