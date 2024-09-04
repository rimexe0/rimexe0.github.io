export function generateColor() {
  var hue = Math.floor(Math.random() * 360);
  var pastel = "hsl(" + hue + ", 100%, 90%,60%)";
  return pastel;
}
