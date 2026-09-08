import { UnitChassis } from "@/components/landing/HaloUnit";
import { RevealText } from "@/components/landing/RevealText";
import type { Proof } from "@/lib/landing-content";

/**
 * One claim per screen, laid out around the pinned display rather than under
 * it. When the screen parks against an edge the copy takes the opposite half
 * of the viewport and sits at reading height; when the screen is centred the
 * copy drops beneath it. Below `md` there is no room to dodge, so the matching
 * capture sits in the flow above a single centred column.
 */
// Edge lanes keep a 6vw inset so a 2.3rem statement never leans on the
// viewport edge, while still clearing the parked screen on the other half.
const lane = {
  center: { row: "justify-center", col: "max-w-[660px] md:pt-[64vh]" },
  left: {
    row: "md:justify-start",
    col: "md:ml-[6vw] md:max-w-[560px] md:pt-[22vh]",
  },
  right: {
    row: "md:justify-end",
    col: "md:mr-[6vw] md:max-w-[560px] md:pt-[22vh]",
  },
} as const;

export function ProofSection({ proof }: { proof: Proof }) {
  const { row, col } = lane[proof.align];
  // Centred lanes put the copy directly under the pinned screen, so it has to
  // finish revealing before it slides behind it. Edge lanes sit beside the
  // screen and can use the reference's own, later window.
  const range = proof.align === "center" ? "early" : "default";

  return (
    <section
      id={proof.id}
      className="relative z-10 flex min-h-svh items-start px-5 pb-16 pt-24 md:items-center md:px-8 md:py-0"
    >
      {/* Wide lane cap: on a 1920 display the copy has to sit far enough out
          to clear the screen's edge beat, which scales up past the frame. */}
      <div
        className={`mx-auto flex w-full max-w-[1680px] flex-col items-center md:flex-row md:items-stretch ${row}`}
      >
        <div className="mb-8 w-full md:hidden">
          <UnitChassis screen={proof.screen} />
        </div>
        <div className={`w-full max-w-[660px] pb-[4vh] pt-0 md:pt-[20vh] ${col}`}>
          <RevealText
            as="h2"
            runs={proof.statement}
            range={range}
            className="text-[clamp(1.2rem,2.5vw,1.85rem)] font-medium leading-[1.22] tracking-[-0.028em]"
          />

          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 md:mt-9">
            {[proof.how, proof.hood].map((column) => (
              <div key={column.label}>
                <RevealText
                  as="h3"
                  by="word"
                  range={range}
                  text={column.label}
                  className="text-[15px] font-normal text-slate-faint"
                />
                <RevealText
                  by="word"
                  range={range}
                  text={column.body}
                  className="mt-2 max-w-[30ch] text-[15px] leading-[1.55] text-slate"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
