import { RevealText } from "@/components/landing/RevealText";
import { manifesto } from "@/lib/landing-content";

/** The positioning statement, revealed character by character on scroll. */
export function Manifesto() {
  return (
    <section className="relative z-10 flex min-h-svh items-center px-5 md:px-8">
      {/* The pinned screen parks hard right over this section, so the
          statement takes the left half rather than sitting behind it —
          inset from the edge, since this is the largest type on the page. */}
      <div className="mx-auto w-full max-w-[900px] pb-[8vh] pt-[16vh] md:mr-auto md:ml-[6vw] md:max-w-[720px] md:pt-[26vh]">
        <RevealText
          as="h2"
          runs={manifesto}
          className="text-[clamp(1.3rem,3vw,2.6rem)] font-medium leading-[1.16] tracking-[-0.032em]"
        />
      </div>
    </section>
  );
}
