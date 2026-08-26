export const LANE_CLASSES = ["is-tray", "is-widgets", "is-queue", "is-out", "is-cal"] as const;

const CLOSE_CLASSES = ["is-open", "is-queue", "is-out", "is-tray", "is-widgets", "is-cal"] as const;

export type Classy = { classList: { add(...names: string[]): void; remove(...names: string[]): void; contains(name: string): boolean } };

export function openShelf<T extends Classy>(notch: T): T {
  notch.classList.remove("is-mini", "is-peek");
  notch.classList.add("is-open");
  return notch;
}

export function closeShelf<T extends Classy>(notch: T): T {
  CLOSE_CLASSES.forEach((name) => {
    notch.classList.remove(name);
  });
  notch.classList.add("is-mini");
  return notch;
}

export function setLane<T extends Classy>(notch: T, laneClass: string | null): T {
  LANE_CLASSES.forEach((name) => {
    notch.classList.remove(name);
  });
  if (laneClass === "is-tray") {
    notch.classList.add("is-tray", "is-filled");
  } else if (laneClass) {
    notch.classList.add(laneClass);
  }
  return notch;
}

export function isMini(notch: Classy): boolean {
  return notch.classList.contains("is-mini");
}

export function isOpen(notch: Classy): boolean {
  return notch.classList.contains("is-open");
}

const HaloNotchMock = {
  LANE_CLASSES,
  openShelf,
  closeShelf,
  setLane,
  isMini,
  isOpen,
};

export default HaloNotchMock;
