var sun = document.getElementById('sun');
var moon = document.getElementById('moon');
document.querySelector("#dark").onclick = function(e){
        sun.classList.toggle("active");
        moon.classList.toggle("active");
darkmode.toggleDarkMode();
}

