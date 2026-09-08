export function generateColor(seed?: string) {
  if (seed === undefined) {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 90%, 60%)`;
  }

  let hash = 0;

  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) % 360;
  }

  const hue = (hash * 70 + 340) % 360;
  return `hsl(${hue}, 100%, 90%, 60%)`;
}
