export function generateColor(seed = "default") {
  let hash = 0;

  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) % 360;
  }

  const hue = (hash * 70 + 340) % 360;
  return `hsl(${hue}, 100%, 90%, 60%)`;
}
