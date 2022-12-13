// Wrap every letter in a span
var textWrapper = document.querySelector('.logo .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({})
  .add({
    targets: '.logo .letter',
    translateY: ["1.1em", 0],
    translateX: ["3em", 0],
    opacity: [0,1],
    translateZ: 0,
    rotateZ: [45, 0],
    scale:[1.3,1],
    duration: 1000,
    easing: 'spring(1, 80, 10, 0)',    delay: (el, i) => 50 * i
  });