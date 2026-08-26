"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { Mascot } from "@/components/brand/Mascot";

type StationKey = "media" | "favorites" | "calendar" | "clips" | "tray" | "notes" | "control" | "apps";

const tracks = [
  { title: "Neon Skyline", artist: "Cassette Motel", duration: 214, art: "linear-gradient(135deg,#ffd400,#ff8a3d)", glow: "#ff8a3d" },
  { title: "Glass Morning", artist: "North Arcade", duration: 187, art: "linear-gradient(135deg,#7dd3fc,#4f46e5)", glow: "#7c3aed" },
  { title: "Slow Charge", artist: "Volt Fox", duration: 243, art: "linear-gradient(135deg,#86efac,#0ea5e9)", glow: "#0ea5e9" },
];

const queueTracks = [
  { title: "Roulette", artist: "Bilal Wahib", art: "linear-gradient(135deg,#f472b6,#7c3aed)" },
  { title: "Habiba", artist: "Boef", art: "linear-gradient(135deg,#fb7185,#be123c)" },
  { title: "Heroine", artist: "CRYOGENIC", art: "linear-gradient(135deg,#a78bfa,#4338ca)" },
];

const devices = [
  { name: "PC Speakers", kind: "speaker", volume: 64 },
  { name: "Studio Headphones", kind: "headphones", volume: 42 },
  { name: "Living Room", kind: "headphones", volume: 30 },
];

const CAL_RED = "#fb4b4b";

type ClipKind = "image" | "text" | "color" | "file";
type Clip = { id: number; kind: ClipKind; value: string; app: string; appName: string; time: string; size: string };

const seedClips: Clip[] = [
  { id: 1, kind: "image", value: "wallpaper.jpg", app: "S", appName: "Snipping Tool", time: "6 min ago", size: "79 KB" },
  { id: 2, kind: "text", value: "A living notch for everything active. halo.example", app: "N", appName: "Notepad", time: "23 min ago", size: "41 chars" },
  { id: 3, kind: "color", value: "#0080FF", app: "D", appName: "Designer", time: "35 min ago", size: "#0080FF" },
  { id: 4, kind: "file", value: "Brand-assets.zip", app: "E", appName: "Explorer", time: "12 min ago", size: "3.3 MB" },
  { id: 5, kind: "text", value: "Minneapolis 55410, 2941 Rocket Drive, United States", app: "M", appName: "Mail", time: "19 min ago", size: "50 chars" },
];

type TrayItem = { id: number; name: string; kind: string; size: string };
type Task = { time: string; title: string; join?: boolean };

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function isoWeek(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function fmtClock(total: number) {
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  return `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`flex h-7 w-12 items-center rounded-full border-2 border-foam/25 p-0.5 transition-colors ${on ? "bg-sun justify-end" : "bg-foam/10 justify-start"}`}
    >
      <span className={`h-5 w-5 rounded-full ${on ? "bg-ink" : "bg-foam/70"}`} />
    </button>
  );
}

function DockIcon({ kind }: { kind: string }) {
  const common = { width: 19, height: 19, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  switch (kind) {
    case "home":
      return <svg {...common}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>;
    case "tray":
      return <svg {...common}><path d="M3 7V5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /></svg>;
    case "clips":
      return <svg {...common}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>;
    case "notes":
      return <svg {...common}><path d="M4 6h10M4 12h16M4 18h16" /><circle cx="4" cy="6" r="0.5" fill="currentColor" /><circle cx="4" cy="12" r="0.5" fill="currentColor" /><circle cx="4" cy="18" r="0.5" fill="currentColor" /></svg>;
    case "star":
      return <svg width={19} height={19} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" /></svg>;
    case "apps":
      return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
    case "calendar":
      return <svg {...common}><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M8 2v4M16 2v4M3 9h18" /></svg>;
    case "sliders":
      return <svg {...common}><path d="M4 8h10M18 8h2M4 16h2M10 16h10" /><circle cx="16" cy="8" r="2" /><circle cx="8" cy="16" r="2" /></svg>;
    case "download":
      return <svg {...common}><path d="M12 4v13M6 12l6 6 6-6" /></svg>;
    default:
      return null;
  }
}

function MiniAppIcon({ kind }: { kind: string }) {
  switch (kind) {
    case "notepad":
      return (
        <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#3d4855]">
          <span className="flex h-7 w-6 flex-col gap-[3px] rounded-sm bg-[#dfe9f5] p-1">
            <span className="h-[2px] w-full rounded bg-[#5b9bd5]" />
            <span className="h-[2px] w-full rounded bg-[#5b9bd5]" />
            <span className="h-[2px] w-2/3 rounded bg-[#5b9bd5]" />
          </span>
        </span>
      );
    case "terminal":
      return <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/20 bg-black font-mono text-[15px] font-bold text-white">▸_</span>;
    case "powershell":
      return <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-gradient-to-b from-[#2a6bbd] to-[#1c4c8f] font-mono text-[14px] font-bold text-white">&gt;_</span>;
    case "taskmgr":
      return (
        <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-gradient-to-b from-[#3b82f6] to-[#1d4ed8]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M4 19V9M10 19V5M16 19v-8M22 19H2" /></svg>
        </span>
      );
    default:
      return null;
  }
}

export function NotchDemo() {
  const [expanded, setExpanded] = useState(false);
  const [station, setStation] = useState<StationKey>("media");

  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(19);
  const [volume, setVolume] = useState(64);
  const [brightness, setBrightness] = useState(100);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airplane, setAirplane] = useState(false);
  const [mediaPanel, setMediaPanel] = useState<"none" | "queue" | "devices">("none");
  const [activeDevice, setActiveDevice] = useState(0);

  const [viewMonth, setViewMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [taskForm, setTaskForm] = useState<{ open: boolean; name: string; date: Date; time: number }>({
    open: false,
    name: "",
    date: new Date(),
    time: 9 * 60,
  });

  const [clips, setClips] = useState<Clip[]>([]);
  const [clipFilter, setClipFilter] = useState<"all" | "text" | "color" | "asset">("all");
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [query, setQuery] = useState("");

  const [tray, setTray] = useState<TrayItem[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const [notes, setNotes] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());

  const [timer, setTimer] = useState<{ total: number; remaining: number; running: boolean } | null>(null);
  const [call, setCall] = useState<{ state: "incoming" | "active"; seconds: number } | null>(null);

  const hydrated = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [bodyH, setBodyH] = useState(232);
  const noteInput = useRef<HTMLInputElement>(null);
  const trayInput = useRef<HTMLInputElement>(null);
  const appsRail = useRef<HTMLDivElement>(null);

  const track = tracks[trackIndex];

  const monthMatrix = useMemo(() => {
    const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const start = new Date(first);
    start.setDate(first.getDate() - offset);
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [viewMonth]);

  const dayTasks = tasks[dateKey(selectedDate)] ?? [];
  const filteredClips = clips.filter((c) => {
    const matchesQuery = c.value.toLowerCase().includes(query.toLowerCase());
    const matchesFilter =
      clipFilter === "all" ||
      (clipFilter === "text" && c.kind === "text") ||
      (clipFilter === "color" && c.kind === "color") ||
      (clipFilter === "asset" && (c.kind === "file" || c.kind === "image"));
    return matchesQuery && matchesFilter;
  });

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000 * 20);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setProgress((p) => (p + 1 >= track.duration ? 0 : p + 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing, track.duration]);

  useEffect(() => {
    if (!timer?.running) return;
    const id = window.setInterval(() => {
      setTimer((t) => {
        if (!t || !t.running) return t;
        if (t.remaining <= 1) return null;
        return { ...t, remaining: t.remaining - 1 };
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timer?.running]);

  useEffect(() => {
    if (call?.state !== "active") return;
    const id = window.setInterval(() => {
      setCall((c) => (c ? { ...c, seconds: c.seconds + 1 } : c));
    }, 1000);
    return () => window.clearInterval(id);
  }, [call?.state]);

  useEffect(() => {
    let cancelled = false;
    const id = window.setTimeout(() => {
      if (cancelled) return;
      try {
        const raw = window.localStorage.getItem("halo-demo-state");
        if (raw) {
          const parsed = JSON.parse(raw) as { notes?: string[]; clips?: Clip[]; tray?: TrayItem[] };
          if (parsed.notes) setNotes(parsed.notes);
          if (parsed.clips) setClips(parsed.clips);
          if (parsed.tray) setTray(parsed.tray);
        } else {
          setNotes(["Ship the landing page", "Water the monstera", "Idea: notch screensaver mode"]);
          setClips(seedClips);
          setTray([
            { id: 1, name: "Project notes.txt", kind: "TXT", size: "12 KB" },
            { id: 2, name: "References", kind: "Folder", size: "24 items" },
          ]);
        }
      } catch {
        setNotes(["Ship the landing page"]);
      }
      hydrated.current = true;
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem("halo-demo-state", JSON.stringify({ notes, clips, tray }));
    } catch {
      /* storage unavailable */
    }
  }, [notes, clips, tray]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    if (!expanded) return;
    const wrapper = wrapperRef.current;
    const onDown = (e: MouseEvent) => {
      if (wrapper && !wrapper.contains(e.target as Node)) setExpanded(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  const setRadios = (next: { wifi?: boolean; bluetooth?: boolean; airplane?: boolean }) => {
    if (next.airplane !== undefined) {
      setAirplane(next.airplane);
      if (next.airplane) {
        setWifi(false);
        setBluetooth(false);
      }
      return;
    }
    if (next.wifi !== undefined) setWifi(next.wifi);
    if (next.bluetooth !== undefined) setBluetooth(next.bluetooth);
  };

  const openStation = (key: StationKey) => {
    setStation(key);
    setExpanded(true);
    setMediaPanel("none");
    if (key === "notes") window.setTimeout(() => noteInput.current?.focus(), 250);
  };

  const copyClip = (value: string) => {
    void navigator.clipboard?.writeText(value).catch(() => undefined);
    setToast("Copied to clipboard");
  };

  const addTrayFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const next: TrayItem[] = [...files].slice(0, 6).map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      kind: f.type.startsWith("image/") ? "Image" : f.name.endsWith(".txt") ? "TXT" : "File",
      size: `${Math.max(1, Math.round(f.size / 1024))} KB`,
    }));
    setTray((t) => [...next, ...t].slice(0, 8));
    setToast("Pinned to the tray");
  };

  const saveTask = () => {
    if (!taskForm.name.trim()) return;
    const key = dateKey(taskForm.date);
    const hh = String(Math.floor(taskForm.time / 60)).padStart(2, "0");
    const mm = String(taskForm.time % 60).padStart(2, "0");
    setTasks((t) => ({
      ...t,
      [key]: [...(t[key] ?? []), { time: `${hh}:${mm}`, title: taskForm.name.trim() }].sort((a, b) =>
        a.time.localeCompare(b.time),
      ),
    }));
    setSelectedDate(taskForm.date);
    setViewMonth(new Date(taskForm.date));
    setTaskForm({ open: false, name: "", date: new Date(), time: 9 * 60 });
    setToast("Task saved");
  };

  const selectedClipRgb = selectedClip?.kind === "color" ? hexToRgb(selectedClip.value) : null;

  // The notch always hugs its content: measure the expanded body and animate to it.
  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el || !expanded) return;
    const measure = () => setBodyH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded]);

  const dockButton = (key: StationKey | "collapse", icon: string, label: string, badge?: number | null) => {
    if (key === "collapse") {
      return (
        <button
          key={key}
          type="button"
          aria-label="Collapse the notch"
          onClick={() => setExpanded(false)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/5 bg-[#111114] text-foam/85 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)] transition-transform hover:scale-105 active:scale-95"
        >
          <DockIcon kind={icon} />
        </button>
      );
    }
    const active = station === key;
    return (
      <button
        key={key}
        type="button"
        aria-label={label}
        aria-pressed={active}
        onClick={() => openStation(key)}
        className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
          active ? "bg-foam/15 text-foam" : "text-foam/70 hover:bg-foam/10 hover:text-foam"
        }`}
      >
        <DockIcon kind={icon} />
        {badge ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sun px-1 font-mono text-[9px] font-bold text-ink">
            {badge}
          </span>
        ) : null}
      </button>
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-[1080px]">
      {/* monitor shell */}
      <div className="rounded-[22px] border-[3px] border-ink bg-[#0f0f12] p-[9px] shadow-pop md:rounded-[30px] md:p-[14px]">
        <div className="relative overflow-hidden rounded-[14px] md:rounded-[18px]" style={{ aspectRatio: "16/9.4" }}>
          {/* wallpaper */}
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-b from-[#6ec3e6] via-[#a9ddf0] to-[#ffe98a]" />
            <div className="absolute left-[14%] top-[14%] aspect-[2.1/1] w-[22%]">
              <div className="absolute left-0 top-[28%] aspect-square w-[38%] rounded-full bg-white" />
              <div className="absolute left-[24%] top-0 aspect-square w-[56%] rounded-full bg-white" />
              <div className="absolute right-0 top-[30%] aspect-square w-[36%] rounded-full bg-white" />
              <div className="absolute inset-x-[8%] bottom-0 h-[46%] rounded-full bg-white" />
            </div>
            <div className="absolute right-[12%] top-[24%] aspect-[2.1/1] w-[17%] opacity-90">
              <div className="absolute left-0 top-[28%] aspect-square w-[38%] rounded-full bg-white" />
              <div className="absolute left-[24%] top-0 aspect-square w-[56%] rounded-full bg-white" />
              <div className="absolute right-0 top-[30%] aspect-square w-[36%] rounded-full bg-white" />
              <div className="absolute inset-x-[8%] bottom-0 h-[46%] rounded-full bg-white" />
            </div>
            <div className="absolute left-1/2 top-[13%] aspect-square w-[17%] -translate-x-1/2 rounded-full bg-[#ffec6e] shadow-[0_0_60px_24px_rgba(255,214,0,0.45)]" />
            <div className="absolute -bottom-[14%] -left-[10%] h-[48%] w-[62%] rounded-[50%] bg-[#8fd14f]" />
            <div className="absolute -bottom-[18%] right-[-12%] h-[56%] w-[68%] rounded-[50%] bg-[#5cab3a]" />
            <div className="absolute inset-0 bg-ink transition-opacity duration-300" style={{ opacity: (100 - brightness) / 130 }} />
            <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-white/12 to-transparent" />
          </div>

          {/* notch */}
          <div
            ref={wrapperRef}
            className="absolute left-1/2 top-0 z-20 -translate-x-1/2"
            onMouseEnter={() => setExpanded(true)}
          >
            {/* concave shoulders where the notch meets the screen edge */}
            <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden className="absolute right-full top-0 -scale-x-100">
              <path d="M 0 0 L 40 0 C 17.909 0 0 17.909 0 40 Z" fill="#0b0b0e" />
            </svg>
            <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden className="absolute left-full top-0">
              <path d="M 0 0 L 40 0 C 17.909 0 0 17.909 0 40 Z" fill="#0b0b0e" />
            </svg>

            <div
              className="overflow-hidden rounded-b-[16px] border-x-0 border-b-[3px] border-ink bg-[#0b0b0e] text-foam transition-[width,height,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:rounded-b-[22px]"
              style={{
                height: expanded ? Math.max(bodyH, 120) : 46,
                width: expanded ? "min(660px,92vw)" : 320,
              }}
            >
              {expanded ? (
                <div ref={bodyRef} className="relative flex flex-col p-4">
                  {/* album glow for media views */}
                  {(station === "media" || station === "favorites") && !call ? (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 transition-colors duration-700"
                      style={{ background: `linear-gradient(to top, ${track.glow}b3, transparent)` }}
                    />
                  ) : null}
                    {call ? (
                      /* incoming / active call */
                      <div className="flex items-center justify-between px-2 py-1">
                        <div className="flex items-center gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-foam/20 font-display text-[18px] font-bold">W</span>
                          <div className="text-[13px] leading-tight text-foam/60">
                            <p>{call.state === "incoming" ? "from" : "Connected"}</p>
                            <p className="text-[15px] font-bold text-foam">Wendy</p>
                          </div>
                        </div>
                        {call.state === "incoming" ? (
                          <div className="flex items-center gap-3">
                            <button type="button" aria-label="Decline call" onClick={() => setCall(null)} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ef4444] text-white transition-transform active:scale-95">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.996.996 0 0 1 0-1.41C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.68-1.36-2.66-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9Z" /></svg>
                            </button>
                            <button type="button" aria-label="Accept call" onClick={() => setCall({ state: "active", seconds: 0 })} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#22c55e] text-white transition-transform active:scale-95">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" /></svg>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[14px] font-bold tabular-nums text-foam/80">{fmtClock(call.seconds)}</span>
                            <button type="button" aria-label="End call" onClick={() => setCall(null)} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ef4444] text-white transition-transform active:scale-95">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.996.996 0 0 1 0-1.41C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.68-1.36-2.66-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9Z" /></svg>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : station === "media" ? (
                      <>
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 shrink-0 rounded-xl border border-white/15" style={{ background: track.art }} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-display text-[19px] font-bold">{track.title}</p>
                            <p className="text-[13px] text-foam/70">{track.artist}</p>
                          </div>
                          {playing ? (
                            <span aria-hidden className="flex items-end gap-[3px]">
                              {[0, 1, 2].map((i) => (
                                <span key={i} className="w-[3px] animate-pulse rounded-full bg-foam" style={{ height: 6 + i * 5, animationDelay: `${i * 150}ms` }} />
                              ))}
                            </span>
                          ) : null}
                        </div>
                        <div className="mt-3">
                          <div
                            role="slider"
                            aria-label="Seek"
                            aria-valuemin={0}
                            aria-valuemax={track.duration}
                            aria-valuenow={progress}
                            tabIndex={0}
                            onClick={(e) => {
                              const box = e.currentTarget.getBoundingClientRect();
                              setProgress(Math.round(((e.clientX - box.left) / box.width) * track.duration));
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "ArrowRight") setProgress((p) => Math.min(p + 5, track.duration));
                              if (e.key === "ArrowLeft") setProgress((p) => Math.max(p - 5, 0));
                            }}
                            className="relative h-[5px] cursor-pointer rounded-full bg-foam/20"
                          >
                            <div className="h-full rounded-full bg-foam" style={{ width: `${(progress / track.duration) * 100}%` }} />
                            <div className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-foam" style={{ left: `calc(${(progress / track.duration) * 100}% - 7px)` }} />
                          </div>
                          <div className="mt-1.5 flex justify-between font-mono text-[11px] text-foam/60">
                            <span>{fmtClock(progress)}</span>
                            <span>-{fmtClock(track.duration - progress)}</span>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <button type="button" aria-label="Playing next" onClick={() => setMediaPanel(mediaPanel === "queue" ? "none" : "queue")} className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${mediaPanel === "queue" ? "bg-foam/20 text-foam" : "text-foam/80 hover:bg-foam/10"}`}>
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M4 6h12M4 12h12M4 18h8M19 6v9M19 15l3-3M19 15l-3-3" /></svg>
                          </button>
                          <div className="flex items-center gap-5">
                            <button type="button" aria-label="Previous track" onClick={() => { setTrackIndex((trackIndex + tracks.length - 1) % tracks.length); setProgress(0); }} className="text-foam hover:opacity-75">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 5h2v14H6zM20 5v14l-11-7z" /></svg>
                            </button>
                            <button type="button" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)} className="text-foam transition-transform active:scale-95">
                              {playing ? (
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
                              ) : (
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M7 4.5v15l13-7.5z" /></svg>
                              )}
                            </button>
                            <button type="button" aria-label="Next track" onClick={() => { setTrackIndex((trackIndex + 1) % tracks.length); setProgress(0); }} className="text-foam hover:opacity-75">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 5h2v14h-2zM4 5v14l11-7z" /></svg>
                            </button>
                          </div>
                          <button type="button" aria-label="Output device" onClick={() => setMediaPanel(mediaPanel === "devices" ? "none" : "devices")} className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${mediaPanel === "devices" ? "bg-foam/20 text-foam" : "text-foam/80 hover:bg-foam/10"}`}>
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="7" width="16" height="10" rx="2" /><path d="M22 11v2" /></svg>
                          </button>
                        </div>
                        {mediaPanel !== "none" ? (
                          <div className="mt-3 space-y-1.5 overflow-auto">
                            {mediaPanel === "devices"
                              ? devices.map((d, i) => (
                                  <button key={d.name} type="button" onClick={() => { setActiveDevice(i); setToast(`Playing on ${d.name}`); }} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${activeDevice === i ? "bg-foam/15" : "bg-foam/5 hover:bg-foam/10"}`}>
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-foam/10 text-foam/75">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                        {d.kind === "speaker" ? <rect x="4" y="2" width="16" height="20" rx="2" /> : <path d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />}
                                      </svg>
                                    </span>
                                    <span className="flex-1 truncate text-[12.5px] font-bold">{d.name}</span>
                                    <span className="h-1 w-24 overflow-hidden rounded-full bg-foam/15">
                                      <span className="block h-full rounded-full bg-foam/70" style={{ width: `${d.volume}%` }} />
                                    </span>
                                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${activeDevice === i ? "bg-foam text-ink" : "bg-foam/20"}`}>
                                      {activeDevice === i ? (
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                                      ) : null}
                                    </span>
                                  </button>
                                ))
                              : queueTracks.map((q) => (
                                  <div key={q.title} className="flex items-center gap-3 rounded-lg bg-foam/5 px-3 py-2">
                                    <span className="h-9 w-9 shrink-0 rounded-md" style={{ background: q.art }} />
                                    <span className="min-w-0 flex-1">
                                      <span className="block truncate text-[12.5px] font-bold">{q.title}</span>
                                      <span className="block truncate text-[11px] text-foam/55">{q.artist}</span>
                                    </span>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="shrink-0 text-foam/40"><path d="M4 8h16M4 12h10M4 16h6" /></svg>
                                  </div>
                                ))}
                          </div>
                        ) : null}
                      </>
                    ) : station === "favorites" ? (
                      <div className="grid grid-cols-[1.1fr_auto_auto] items-center gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="relative h-14 w-14 shrink-0 rounded-xl border border-white/15" style={{ background: track.art }}>
                            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ef4444] text-[8px] font-bold text-white">1</span>
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-[14.5px] font-bold">{track.title}</p>
                            <p className="truncate text-[12px] text-foam/65">{track.artist}</p>
                            <p className="truncate text-[12px] text-foam/45">{track.title === "Neon Skyline" ? "Cassette Motel" : "Single"}</p>
                            <div className="mt-1 flex items-center gap-2 text-foam">
                              <button type="button" aria-label="Previous track" onClick={() => { setTrackIndex((trackIndex + tracks.length - 1) % tracks.length); setProgress(0); }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 5h2v14H6zM20 5v14l-11-7z" /></svg>
                              </button>
                              <button type="button" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)}>
                                {playing ? (
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
                                ) : (
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M7 4.5v15l13-7.5z" /></svg>
                                )}
                              </button>
                              <button type="button" aria-label="Next track" onClick={() => { setTrackIndex((trackIndex + 1) % tracks.length); setProgress(0); }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 5h2v14h-2zM4 5v14l11-7z" /></svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {["Open Spotify", "Ring Later"].map((label) => (
                            <button key={label} type="button" onClick={() => setToast(`${label} — runs in the Windows app`)} className="flex items-center gap-2 rounded-full bg-foam/10 px-3.5 py-2 text-[11.5px] font-bold text-foam/90 hover:bg-foam/20">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" /></svg>
                              {label}
                            </button>
                          ))}
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {[
                            { label: "Calendar", key: "calendar" as StationKey },
                            { label: "Notes", key: "notes" as StationKey },
                            { label: "Bluetooth", key: null },
                          ].map((s) => (
                            <button
                              key={s.label}
                              type="button"
                              onClick={() => (s.key ? openStation(s.key) : setToast("Bluetooth devices open in the app"))}
                              className="flex items-center gap-2 rounded-lg bg-foam/10 px-3 py-1.5 text-[11.5px] font-bold text-foam/90 hover:bg-foam/20"
                            >
                              {s.label === "Calendar" ? <DockIcon kind="calendar" /> : s.label === "Notes" ? <DockIcon kind="notes" /> : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m7 7 10 10-5 5V2l5 5L7 17" /></svg>}
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : station === "calendar" ? (
                      <div className="grid grid-cols-[1.15fr_1fr] gap-4">
                        <div className="flex min-w-0 flex-col">
                          <div className="flex items-center justify-between">
                            <p className="font-display text-[19px] font-extrabold uppercase tracking-[0.04em]" style={{ color: CAL_RED }}>
                              {viewMonth.toLocaleDateString([], { month: "long" })}
                            </p>
                            <div className="flex items-center gap-2">
                              <button type="button" aria-label="New task" onClick={() => setTaskForm({ open: true, name: "", date: selectedDate, time: 9 * 60 })} className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ background: CAL_RED }}>
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
                              </button>
                              <button type="button" aria-label="Previous month" onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))} className="flex h-9 w-9 items-center justify-center rounded-full bg-foam/10 text-foam/80 hover:bg-foam/20">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m15 18-6-6 6-6" /></svg>
                              </button>
                              <button type="button" aria-label="Next month" onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))} className="flex h-9 w-9 items-center justify-center rounded-full bg-foam/10 text-foam/80 hover:bg-foam/20">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m9 18 6-6-6-6" /></svg>
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 grid flex-1 grid-cols-7 content-start gap-y-1 text-center">
                            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                              <span key={`${d}-${i}`} className="py-1 text-[12px] font-bold text-foam/50">{d}</span>
                            ))}
                            {monthMatrix.map((d) => {
                              const otherMonth = d.getMonth() !== viewMonth.getMonth();
                              const isSelected = dateKey(d) === dateKey(selectedDate);
                              const isToday = dateKey(d) === dateKey(now);
                              const hasEvents = (tasks[dateKey(d)] ?? []).length > 0;
                              return (
                                <button
                                  key={d.toISOString()}
                                  type="button"
                                  onClick={() => setSelectedDate(d)}
                                  className={`relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-bold transition-colors ${
                                    isSelected
                                      ? "text-white"
                                      : otherMonth
                                        ? "text-foam/25 hover:bg-foam/5"
                                        : "text-foam/90 hover:bg-foam/10"
                                  }`}
                                  style={isSelected ? { background: CAL_RED } : undefined}
                                >
                                  {d.getDate()}
                                  {isToday && !isSelected ? <span className="absolute bottom-0.5 h-1 w-1 rounded-full" style={{ background: CAL_RED }} /> : null}
                                  {hasEvents && !isSelected ? <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full" style={{ background: CAL_RED }} /> : null}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex min-w-0 flex-col border-l border-white/10 pl-4">
                          {taskForm.open ? (
                            <div className="flex flex-col rounded-xl border border-white/10 bg-foam/5 p-3">
                              <div className="flex items-center justify-between">
                                <p className="text-[15px] font-bold">New Task</p>
                                <button type="button" aria-label="Close new task" onClick={() => setTaskForm((f) => ({ ...f, open: false }))} className="text-foam/50 hover:text-foam">
                                  <X className="h-4 w-4" aria-hidden />
                                </button>
                              </div>
                              <label className="mt-3 block text-[11px] font-bold text-foam/60">Task name</label>
                              <input
                                type="text"
                                value={taskForm.name}
                                onChange={(e) => setTaskForm((f) => ({ ...f, name: e.target.value }))}
                                placeholder="Prepare launch brief"
                                aria-label="Task name"
                                className="mt-1 h-10 rounded-lg border border-white/15 bg-foam/5 px-3 text-[13px] text-foam placeholder:text-foam/30 focus:border-[#2563eb] focus:outline-none"
                              />
                              <div className="mt-3 grid grid-cols-2 gap-2">
                                <div>
                                  <p className="text-[11px] font-bold text-foam/60">Date</p>
                                  <div className="mt-1 flex h-9 items-center justify-between rounded-lg border border-white/15 bg-foam/5 px-2">
                                    <button type="button" aria-label="Previous day" onClick={() => setTaskForm((f) => { const d = new Date(f.date); d.setDate(d.getDate() - 1); return { ...f, date: d }; })} className="text-foam/60 hover:text-foam">
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m15 18-6-6 6-6" /></svg>
                                    </button>
                                    <span className="text-[11.5px] font-bold">{taskForm.date.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" })}</span>
                                    <button type="button" aria-label="Next day" onClick={() => setTaskForm((f) => { const d = new Date(f.date); d.setDate(d.getDate() + 1); return { ...f, date: d }; })} className="text-foam/60 hover:text-foam">
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m9 18 6-6-6-6" /></svg>
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-[11px] font-bold text-foam/60">Time</p>
                                  <div className="mt-1 flex h-9 items-center justify-between rounded-lg border border-white/15 bg-foam/5 px-2">
                                    <button type="button" aria-label="Earlier time" onClick={() => setTaskForm((f) => ({ ...f, time: (f.time + 1410) % 1440 }))} className="text-foam/60 hover:text-foam">
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m15 18-6-6 6-6" /></svg>
                                    </button>
                                    <span className="font-mono text-[11.5px] font-bold">{String(Math.floor(taskForm.time / 60)).padStart(2, "0")}:{String(taskForm.time % 60).padStart(2, "0")}</span>
                                    <button type="button" aria-label="Later time" onClick={() => setTaskForm((f) => ({ ...f, time: (f.time + 30) % 1440 }))} className="text-foam/60 hover:text-foam">
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m9 18 6-6-6-6" /></svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 flex justify-end gap-2">
                                <button type="button" onClick={() => setTaskForm((f) => ({ ...f, open: false }))} className="rounded-lg bg-foam/10 px-3.5 py-2 text-[12px] font-bold text-foam/80 hover:bg-foam/20">
                                  Cancel
                                </button>
                                <button type="button" onClick={saveTask} className="rounded-lg bg-[#2563eb] px-4 py-2 text-[12px] font-bold text-white transition-transform active:scale-95">
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col">
                              <p
                                className="rounded-lg px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.08em]"
                                style={{
                                  color: dateKey(selectedDate) === dateKey(now) ? CAL_RED : "rgba(255,253,246,0.75)",
                                  background: dateKey(selectedDate) === dateKey(now) ? "rgba(251,75,75,0.14)" : "rgba(255,253,246,0.06)",
                                }}
                              >
                                {dateKey(selectedDate) === dateKey(now) ? "TODAY" : selectedDate.toLocaleDateString([], { weekday: "long" })} (WK. {isoWeek(selectedDate)})
                              </p>
                              <div className="mt-2 flex-1 space-y-1.5 overflow-auto">
                                {dayTasks.length === 0 ? (
                                  <p className="rounded-lg bg-foam/5 px-3 py-4 text-[12.5px] text-foam/55">
                                    <span className="block text-[14px] font-bold text-foam/85">No events</span>
                                    Add a task for this day
                                  </p>
                                ) : (
                                  dayTasks.map((task) => (
                                    <div key={`${task.time}-${task.title}`} className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-foam/5 px-2.5 py-2">
                                      <span className="font-mono text-[11px] font-bold text-sun">{task.time}</span>
                                      <span className="flex-1 truncate text-[12.5px] font-bold">{task.title}</span>
                                      {task.join ? <span className="rounded-full bg-sun px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-ink">Join</span> : null}
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : station === "clips" ? (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 flex-1 items-center gap-2 rounded-full bg-foam/10 px-3">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden className="text-foam/45"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                            <input
                              type="text"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="Search"
                              aria-label="Search clips"
                              className="w-full bg-transparent text-[12px] font-medium text-foam placeholder:text-foam/45 focus:outline-none"
                            />
                          </div>
                          <button type="button" onClick={() => { setClips([]); setSelectedClip(null); setToast("History cleared"); }} className="text-[12.5px] font-bold text-foam/70 hover:text-foam">
                            Clear
                          </button>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5">
                          {([
                            { key: "all", label: "All" },
                            { key: "text", label: "Text" },
                            { key: "color", label: "Colors" },
                            { key: "asset", label: "Assets" },
                          ] as const).map((f) => (
                            <button
                              key={f.key}
                              type="button"
                              onClick={() => setClipFilter(f.key)}
                              className={`rounded-full px-3.5 py-1.5 text-[11.5px] font-bold transition-colors ${
                                clipFilter === f.key ? "bg-foam text-ink" : "bg-foam/10 text-foam/80 hover:bg-foam/20"
                              }`}
                            >
                              {f.label}
                            </button>
                          ))}
                        </div>
                        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-foam/40">Today</p>
                        <div className="mt-1 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
                          {filteredClips.map((clip) => {
                            const selected = selectedClip?.id === clip.id;
                            return (
                              <button
                                key={clip.id}
                                type="button"
                                onClick={() => setSelectedClip(clip)}
                                className={`relative flex h-[104px] w-[118px] shrink-0 flex-col justify-end overflow-hidden rounded-xl p-2 text-left transition-transform hover:-translate-y-0.5 ${
                                  clip.kind === "color"
                                    ? ""
                                    : clip.kind === "image"
                                      ? "bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-800"
                                      : "border border-white/10 bg-foam/10"
                                } ${selected ? "ring-2 ring-[#4f8ff7]" : ""}`}
                                style={clip.kind === "color" ? { background: clip.value } : undefined}
                              >
                                {clip.kind === "text" ? (
                                  <span className="line-clamp-3 text-[10.5px] font-medium leading-snug text-white">{clip.value}</span>
                                ) : clip.kind === "color" ? (
                                  <span className="text-[11px] font-bold text-white mix-blend-difference">{clip.value.toUpperCase()}</span>
                                ) : clip.kind === "file" ? (
                                  <span className="flex h-full items-center justify-center text-foam/70">
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M3 7V5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /></svg>
                                  </span>
                                ) : (
                                  <span className="flex h-full items-center justify-center">
                                    <span className="h-14 w-14 rounded-full border-4 border-white/25" style={{ background: "conic-gradient(from 180deg,#f472b6,#7c3aed,#0ea5e9,#f472b6)" }} />
                                  </span>
                                )}
                                <span className="relative mt-2 flex items-center justify-between text-[8.5px] text-white/60">
                                  <span className="flex h-4 w-4 items-center justify-center rounded bg-black/50 font-bold text-white">{clip.app}</span>
                                  <span>{clip.time}</span>
                                  <span>{clip.size}</span>
                                </span>
                              </button>
                            );
                          })}
                          {clips.length > 0 && filteredClips.length === 0 ? (
                            <p className="rounded-xl border-2 border-dashed border-white/15 p-4 text-[13px] text-foam/50">No clips match “{query}”.</p>
                          ) : null}
                        </div>

                        {selectedClip ? (
                          <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-foam/5">
                            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                              <p className="truncate text-[11.5px] text-foam/60">
                                <span className="rounded bg-foam/15 px-1.5 py-0.5 font-bold capitalize text-foam">{selectedClip.kind}</span>
                                <span className="mx-1.5">From {selectedClip.appName} · {selectedClip.size} · {selectedClip.time}</span>
                              </p>
                              <div className="flex items-center gap-1">
                                <button type="button" onClick={() => copyClip(selectedClip.value)} className="flex items-center gap-1 rounded-md px-2 py-1 text-[11.5px] font-bold text-foam/80 hover:bg-foam/10 hover:text-foam">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
                                  Copy
                                  <ChevronRight className="h-3 w-3 rotate-90" aria-hidden />
                                </button>
                                <button type="button" aria-label="Share clip" onClick={() => setToast("Share opens in the app")} className="flex h-7 w-7 items-center justify-center rounded-md text-foam/60 hover:bg-foam/10 hover:text-foam">
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></svg>
                                </button>
                                <button type="button" aria-label="Edit clip" onClick={() => setToast("Edit opens in the app")} className="flex h-7 w-7 items-center justify-center rounded-md text-foam/60 hover:bg-foam/10 hover:text-foam">
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
                                </button>
                                <button type="button" aria-label="Delete clip" onClick={() => { setClips(clips.filter((c) => c.id !== selectedClip.id)); setSelectedClip(null); }} className="flex h-7 w-7 items-center justify-center rounded-md text-foam/60 hover:bg-foam/10 hover:text-[#ef4444]">
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></svg>
                                </button>
                                <button type="button" aria-label="Close preview" onClick={() => setSelectedClip(null)} className="flex h-7 w-7 items-center justify-center rounded-md text-foam/60 hover:bg-foam/10 hover:text-foam">
                                  <X className="h-3.5 w-3.5" aria-hidden />
                                </button>
                              </div>
                            </div>
                            <div className="flex min-h-0 flex-1 flex-col p-2">
                              <div className="min-h-0 flex-1 overflow-hidden rounded-lg">
                                {selectedClip.kind === "color" ? (
                                  <div className="h-full w-full" style={{ background: selectedClip.value }} />
                                ) : selectedClip.kind === "image" ? (
                                  <div className="h-full w-full bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-800" />
                                ) : (
                                  <p className="p-3 text-[15px] font-bold leading-relaxed text-foam">{selectedClip.value}</p>
                                )}
                              </div>
                              {selectedClipRgb ? (
                                <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-[10.5px]">
                                  <p className="text-foam/50">HEX <span className="ml-1 font-bold text-foam">{selectedClip.value.toUpperCase()}</span></p>
                                  <p className="text-foam/50">RGB <span className="ml-1 font-bold text-foam">rgb({selectedClipRgb.join(", ")})</span></p>
                                  <p className="text-foam/50">HSL <span className="ml-1 font-bold text-foam">{rgbToHsl(...selectedClipRgb)}</span></p>
                                </div>
                              ) : (
                                <p className="mt-2 text-[11px] text-foam/45">
                                  From {selectedClip.appName} · {selectedClip.size} · {selectedClip.value.trim().split(/\s+/).length} words · {selectedClip.time}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <p className="mt-3 pb-1 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-foam/35">
                            Click a card to preview it here
                          </p>
                        )}
                      </div>
                    ) : station === "tray" ? (
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <p className="text-[13.5px] font-bold">Tray · {tray.length} item{tray.length === 1 ? "" : "s"}</p>
                          {tray.length > 0 ? (
                            <button type="button" onClick={() => { setTray([]); setToast("Tray cleared"); }} className="text-[12.5px] font-bold text-foam/70 hover:text-foam">
                              Clear
                            </button>
                          ) : null}
                        </div>
                        {tray.length === 0 ? (
                          <button
                            type="button"
                            onClick={() => trayInput.current?.click()}
                            className={`mt-2 flex min-h-[190px] flex-1 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed transition-colors ${
                              dragOver ? "border-sun bg-sun/10" : "border-[#4f8ff7]/70"
                            }`}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragOver(true);
                            }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setDragOver(false);
                              addTrayFiles(e.dataTransfer.files);
                            }}
                          >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f8ff7" strokeWidth="1.8" aria-hidden><path d="M3 7V5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /></svg>
                            <span className="text-[13px] font-bold text-[#4f8ff7]">Files Tray</span>
                            <span className="text-[11.5px] text-foam/55">Drop files on the notch to pin references</span>
                          </button>
                        ) : (
                          <div
                            className={`mt-2 grid flex-1 grid-cols-4 content-start gap-2 overflow-auto rounded-xl p-1 ${dragOver ? "border-2 border-dashed border-sun bg-sun/10" : ""}`}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragOver(true);
                            }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setDragOver(false);
                              addTrayFiles(e.dataTransfer.files);
                            }}
                          >
                            {tray.map((item) => (
                              <div key={item.id} className="group relative">
                                <button
                                  type="button"
                                  aria-label={`Remove ${item.name}`}
                                  onClick={() => setTray(tray.filter((t) => t.id !== item.id))}
                                  className="absolute -right-1.5 -top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-foam/20 text-foam opacity-0 transition-opacity hover:bg-[#ef4444] hover:text-white group-hover:opacity-100"
                                >
                                  <X className="h-3 w-3" aria-hidden />
                                </button>
                                <div className="flex h-[92px] flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-foam/10 px-2">
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-foam/80" aria-hidden>
                                    {item.kind === "Folder" ? (
                                      <path d="M3 7V5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
                                    ) : (
                                      <>
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <path d="M14 2v6h6" />
                                      </>
                                    )}
                                  </svg>
                                  <span className="w-full truncate text-center text-[10.5px] font-bold">{item.name}</span>
                                  <span className="text-[9.5px] text-foam/50">{item.kind} · {item.size}</span>
                                </div>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => trayInput.current?.click()}
                              className="flex h-[92px] items-center justify-center rounded-xl border-2 border-dashed border-white/20 text-foam/50 transition-colors hover:border-sun hover:text-sun"
                              aria-label="Add files"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
                            </button>
                          </div>
                        )}
                        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-foam/35">
                          Drop files on the notch to add references
                        </p>
                        <input
                          ref={trayInput}
                          type="file"
                          multiple
                          className="hidden"
                          aria-label="Add files to the tray"
                          onChange={(e) => {
                            addTrayFiles(e.target.files);
                            e.target.value = "";
                          }}
                        />
                      </div>
                    ) : station === "notes" ? (
                      <div className="flex flex-col gap-2">
                        <input
                          ref={noteInput}
                          type="text"
                          placeholder="Write a note, press Enter"
                          aria-label="New note"
                          className="h-9 rounded-xl border border-white/10 bg-foam/5 px-3 text-[13px] text-foam placeholder:text-foam/35 focus:border-sun focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.currentTarget.value.trim()) {
                              setNotes([e.currentTarget.value.trim(), ...notes]);
                              e.currentTarget.value = "";
                              setToast("Note saved locally");
                            }
                          }}
                        />
                        <div className="flex-1 space-y-1.5 overflow-auto pr-1">
                          {notes.map((note, i) => (
                            <div key={`${note}-${i}`} className="group flex items-center gap-2 rounded-xl border border-white/10 bg-foam/5 px-3 py-2">
                              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden><circle cx="8" cy="8" r="7" fill="var(--sun)" /></svg>
                              <span className="flex-1 truncate text-[13.5px]">{note}</span>
                              <button type="button" aria-label={`Delete note ${note}`} onClick={() => setNotes(notes.filter((_, j) => j !== i))} className="text-foam/35 opacity-0 transition-opacity hover:text-sun group-hover:opacity-100">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden><path d="M18 6 6 18M6 6l12 12" /></svg>
                              </button>
                            </div>
                          ))}
                        </div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-foam/35">Autosaves to this browser</p>
                      </div>
                    ) : station === "control" ? (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2 grid grid-cols-3 gap-3">
                          {[
                            { label: "Wi-Fi", on: wifi, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" /></svg> },
                            { label: "Bluetooth", on: bluetooth, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m7 7 10 10-5 5V2l5 5L7 17" /></svg> },
                            { label: "Airplane", on: airplane, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" /></svg> },
                          ].map((t) => (
                            <div key={t.label} className={`flex flex-col gap-2 rounded-xl border-2 p-3 ${t.on ? "border-sun/60 bg-foam/10" : "border-white/10 bg-foam/5"}`}>
                              <span className={t.on ? "text-sun" : "text-foam/50"}>{t.icon}</span>
                              <Toggle
                                on={t.on}
                                onChange={(v) =>
                                  setRadios(
                                    t.label === "Wi-Fi"
                                      ? { wifi: v }
                                      : t.label === "Bluetooth"
                                        ? { bluetooth: v }
                                        : { airplane: v },
                                  )
                                }
                                label={t.label}
                              />
                              <span className="text-[12px] font-bold text-foam/70">{t.label}</span>
                            </div>
                          ))}
                        </div>
                        {[
                          { label: "Volume", value: volume, set: setVolume },
                          { label: "Brightness", value: brightness, set: setBrightness },
                        ].map((s) => (
                          <div key={s.label} className="rounded-xl border-2 border-white/10 bg-foam/5 p-3">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-[12px] font-bold text-foam/70">{s.label}</span>
                              <span className="font-mono text-[11px] text-sun">{s.value}</span>
                            </div>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={s.value}
                              aria-label={s.label}
                              onChange={(e) => s.set(Number(e.target.value))}
                              className="w-full accent-[#ffd400]"
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => { setTimer({ total: 1500, remaining: 1500, running: true }); setToast("Focus Timer started"); }}
                          className="col-span-2 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 py-2.5 text-[12.5px] font-bold text-foam/75 transition-colors hover:border-sun hover:text-sun"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M9 2h6" /></svg>
                          Start Focus Timer · 25:00
                        </button>
                      </div>
                    ) : (
                      /* apps rail */
                      <div className="relative flex items-center py-1">
                        <div ref={appsRail} className="flex gap-5 overflow-x-auto scroll-smooth pr-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                          {[
                            { kind: "notepad", name: "Notepad" },
                            { kind: "terminal", name: "Command" },
                            { kind: "powershell", name: "PowerShell" },
                            { kind: "files", name: "Explorer", icon: "files" },
                            { kind: "taskmgr", name: "Task Manager" },
                            { kind: "browser", name: "Edge", icon: "browser" },
                            { kind: "music", name: "Spotify", icon: "music" },
                          ].map((app) => (
                            <button key={app.name} type="button" onClick={() => setToast(`${app.name} would open on your PC`)} className="flex w-[64px] shrink-0 flex-col items-center gap-2">
                              {app.icon ? <AppTile kind={app.icon} /> : <MiniAppIcon kind={app.kind} />}
                              <span className="text-[11px] font-bold text-foam/85">{app.name}</span>
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          aria-label="Scroll apps"
                          onClick={() => appsRail.current?.scrollBy({ left: 240, behavior: "smooth" })}
                          className="absolute -right-1 top-[30px] flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#1c1c22] text-foam/80 shadow-lg transition-transform hover:scale-105"
                        >
                          <ChevronRight className="h-4 w-4" aria-hidden />
                        </button>
                       </div>
                     )}
                 </div>
               ) : (
                 /* collapsed strip */
                 <div
                  role="button"
                  tabIndex={0}
                  aria-label="Expand the Halo notch"
                  aria-expanded={expanded}
                  onClick={(e) => {
                    const pointerType = e.nativeEvent instanceof PointerEvent ? e.nativeEvent.pointerType : "mouse";
                    if (pointerType === "mouse") return;
                    setExpanded((v) => !v);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpanded(true);
                    }
                  }}
                  className="flex h-full cursor-pointer items-center justify-between px-5 outline-none focus-visible:bg-foam/10"
                >
                  <span className="w-16 font-mono text-[12px] font-bold tabular-nums text-foam/85">
                    {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <Mascot size={40} animation="idle" pokeAnimation="excited" ariaLabel="notch mascot" />
                  <span className="flex w-16 items-center justify-end gap-1.5">
                    {airplane ? (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#ffd400" aria-hidden><path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" /></svg>
                    ) : wifi ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffd400" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" /></svg>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8b8b95" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M12 20h.01M8.5 16.4a5 5 0 0 1 7 0M2 9.8a16 16 0 0 1 20 0" /></svg>
                    )}
                    <span className="font-mono text-[11px] font-bold text-foam/85">86%</span>
                  </span>
                </div>
              )}
            </div>

            {/* timer live activity pill — floats below the notch, even when collapsed */}
            {timer ? (
              <div className="mt-2.5 flex h-[64px] w-[min(460px,86vw)] items-center justify-between rounded-full border border-white/5 bg-[#111114] py-1.5 pl-2 pr-3 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.65)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5a623]/15 text-[#f5a623]">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M9 2h6" /></svg>
                </span>
                <span className="min-w-0 flex-1 pl-3">
                  <span className="block truncate text-[14.5px] font-bold leading-tight">Focus Timer</span>
                  <span className="block truncate text-[12px] leading-tight text-foam/55">Deep Work</span>
                </span>
                <span className="font-display text-[30px] font-extrabold tabular-nums text-[#f5a623]">
                  {fmtClock(timer.remaining)}
                </span>
                <span className="flex items-center gap-2 pl-3">
                  <button
                    type="button"
                    aria-label={timer.running ? "Pause timer" : "Resume timer"}
                    onClick={() => setTimer((t) => (t ? { ...t, running: !t.running } : t))}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5a623]/20 text-[#f5a623] transition-transform active:scale-95"
                  >
                    {timer.running ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M7 4.5v15l13-7.5z" /></svg>
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label="Stop timer"
                    onClick={() => setTimer(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-foam/10 text-foam/85 transition-transform active:scale-95"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden><rect x="5" y="5" width="14" height="14" rx="2" /></svg>
                  </button>
                </span>
              </div>
            ) : null}

            {/* dock nav — below the notch, like the app */}
            {expanded && !call ? (
              <div className="mt-2.5 flex items-center justify-center gap-2.5">
                <div className="flex items-center gap-1 rounded-full border border-white/5 bg-[#111114] p-1.5 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.65)]">
                  {dockButton("media", "home", "Home")}
                  {dockButton("tray", "tray", "Files Tray", tray.length || null)}
                  {dockButton("clips", "clips", "Clips")}
                  {dockButton("notes", "notes", "Notes")}
                  {dockButton("favorites", "star", "Favorites")}
                </div>
                <div className="flex items-center gap-1 rounded-full border border-white/5 bg-[#111114] p-1.5 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.65)]">
                  {dockButton("apps", "apps", "Apps")}
                  {dockButton("calendar", "calendar", "Calendar", dayTasks.length || null)}
                  {dockButton("control", "sliders", "Control Center")}
                </div>
                {dockButton("collapse", "download", "Collapse")}
              </div>
            ) : null}
          </div>

          {/* toast */}
          {toast ? (
            <div className="absolute bottom-16 right-4 z-30 rounded-full border-[2.5px] border-ink bg-sun px-4 py-2 text-[13px] font-bold text-ink shadow-sticker-sm">
              {toast}
            </div>
          ) : null}

          {/* Windows taskbar */}
          <div className="absolute inset-x-0 bottom-0 z-10 h-11 border-t border-white/10 bg-[#101018]/80 backdrop-blur-md">
            <div className="relative flex h-full items-center justify-center gap-1.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-foam/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#e5e7eb" aria-hidden><path d="M3 4.5 10.5 3.4v7.6H3V4.5ZM3 19.5l7.5 1.1V13H3v6.5ZM12 3.2 21 2v9h-9V3.2ZM12 20.8 21 22v-9h-9v7.8Z" /></svg>
              </span>
              <span className="mx-1 h-5 w-px bg-foam/15" aria-hidden />
              {["files", "browser", "music", "mail", "photos"].map((kind) => (
                <button
                  key={kind}
                  type="button"
                  aria-label={`Open ${kind}`}
                  onClick={() => openStation(kind === "music" ? "media" : kind === "files" ? "tray" : "apps")}
                  className="flex h-8 w-8 items-center justify-center rounded-md opacity-85 transition-opacity hover:bg-foam/10 hover:opacity-100"
                >
                  <AppTile kind={kind} small />
                </button>
              ))}
            </div>
            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.4" strokeLinecap="round" aria-hidden><path d="m6 15 6-6 6 6" /></svg>
              {airplane ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#cbd5e1" aria-hidden><path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" /></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" /></svg>
              )}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 5 6 9H2v6h4l5 4V5ZM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" /></svg>
              <span className="flex items-center gap-1">
                <span className="relative inline-block h-[11px] w-[22px] rounded-[3px] border border-[#cbd5e1]">
                  <span className="absolute inset-[2px] right-[6px] rounded-[1px] bg-[#cbd5e1]" />
                </span>
                <span className="font-mono text-[10px] text-[#cbd5e1]">86%</span>
              </span>
              <span className="ml-1 text-right font-mono text-[10.5px] font-bold leading-tight text-[#e2e8f0]">
                <p>{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                <p className="text-[#94a3b8]">{now.toLocaleDateString([], { month: "short", day: "numeric" })}</p>
              </span>
            </div>
          </div>
        </div>

        {/* chin with brand dot */}
        <div className="flex h-6 items-center justify-center md:h-7">
          <span className="h-1.5 w-1.5 rounded-full bg-foam/25 md:h-2 md:w-2" />
        </div>
      </div>

      {/* stand */}
      <div
        className="mx-auto h-9 w-[74px] bg-gradient-to-b from-[#232329] to-[#15151a] md:h-14 md:w-[104px]"
        style={{ clipPath: "polygon(8% 0, 92% 0, 100% 100%, 0 100%)" }}
      />
      <div className="mx-auto h-2.5 w-[190px] rounded-[8px] bg-gradient-to-b from-[#2b2b33] to-[#15151a] shadow-[0_14px_24px_-10px_rgba(27,27,32,0.5)] md:h-3.5 md:w-[280px]" />
      <div aria-hidden className="mx-auto mt-1 h-4 w-[70%] rounded-[50%] bg-ink/15 blur-md md:w-[62%]" />
    </div>
  );
}

function AppTile({ kind, small = false }: { kind: string; small?: boolean }) {
  const size = small ? 22 : 44;
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true as const };
  switch (kind) {
    case "music":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" fill="#1DB954" />
          <path d="M7 9.5c3.5-1 7-.5 10 1M7.5 13c3-.8 6-.4 8.5 1M8 16.2c2.4-.6 4.8-.3 7 .8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "browser":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" fill="#3b82f6" />
          <ellipse cx="12" cy="12" rx="4.5" ry="10" stroke="#dbeafe" strokeWidth="1.6" />
          <path d="M2.5 12h19M4 7h16M4 17h16" stroke="#dbeafe" strokeWidth="1.6" />
        </svg>
      );
    case "files":
      return (
        <svg {...common}>
          <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4l2 2.5h9A1.5 1.5 0 0 1 21 9v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V6.5Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1.2" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1.2" />
          <path d="m4 7 8 6 8-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "photos":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2.5" fill="#a7f3d0" stroke="#047857" strokeWidth="1.2" />
          <circle cx="9" cy="10" r="2" fill="#f59e0b" />
          <path d="m5 18 5-6 4 4.5L17 13l3 5" stroke="#047857" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" fill="#e5e7eb" stroke="#374151" strokeWidth="1.4" />
          <circle cx="12" cy="12" r="3" fill="#374151" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}


