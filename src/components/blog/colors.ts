// Same hash-to-hue idea as components/helpers/helping.ts, but opaque,
// so tags and long text stay readable on top of the animated background.
function hue(seed: string) {
  let hash = 0;
  for (const c of seed) hash = (hash * 31 + c.charCodeAt(0)) % 360;
  return (hash * 70 + 340) % 360;
}

export const tagColor = (tag: string) => `hsl(${hue(tag)} 100% 85%)`;
export const panelColor = (seed: string) => `hsl(${hue(seed)} 100% 96% / 0.94)`;
