
  
var load = anime({
    targets: ".about-card",
    
    translateY: ["-30em", 0],duration:700,
    
   
   
    opacity: {
        value:[0,1],
        duration:1000,
        easing: 'cubicBezier(.5, .05, .1, .3)'
        },
    easing: 'easeOutBack',
    delay: anime.stagger(150, {  easing: 'cubicBezier(.5, .05, .1, .3)'}),
    

});


  document.getElementsByTagName("body")[0].onload = (load.play(), 500);
