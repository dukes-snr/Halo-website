const shots = [
  { src: "/product/feature-home-dashboard.png", alt: "Halo home dashboard" },
  { src: "/product/feature-notes-editor.png", alt: "Halo notes editor" },
  { src: "/product/feature-calendar.png", alt: "Halo calendar" },
  { src: "/product/feature-control-center.png", alt: "Halo control center" },
  { src: "/product/feature-bluetooth.png", alt: "Halo Bluetooth devices" },
  { src: "/product/feature-drop-actions.png", alt: "Halo drop actions" },
  { src: "/product/feature-notes-list.png", alt: "Halo notes list" },
  { src: "/product/feature-event-reminder.png", alt: "Halo event reminder" },
];

export function ImageMarquee() {
  const loop = [...shots, ...shots];

  return (
    <div className="marquee-track mt-16 mb-16 overflow-hidden md:mt-20">
      <div className="animate-marquee flex w-max">
        {loop.map((shot, i) => (
          <div
            key={`${shot.src}-${i}`}
            className="mx-3 flex h-[180px] w-[300px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#071016] shadow-lg md:h-[280px] md:w-[500px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot.src}
              alt={i < shots.length ? shot.alt : ""}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
