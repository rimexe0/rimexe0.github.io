// Wrap every letter in a span
var textWrapper = document.querySelector('.logo .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({})
  .add({
    targets: '.logo .letter',
    translateY: ["1.1em", 0],
    translateX: ["1.55em", 0],
    opacity: [0,1],
    translateZ: 0,
    rotateZ: [45, 0],
    duration: 1000,
    easing: "easeOutExpo",
    delay: (el, i) => 50 * i
  });