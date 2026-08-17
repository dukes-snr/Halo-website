import { getHaloFramerPage } from "@/lib/haloFramerHtml";

export function HaloFramerHome() {
  const { css, html } = getHaloFramerPage();
  return (
    <div className="halo-framer-root">
      <div dangerouslySetInnerHTML={{ __html: css + html }} />
    </div>
  );
}
