var sun = document.getElementById('sun');
var moon = document.getElementById('moon');
document.querySelector("#dark").onclick = function(e){
        sun.classList.toggle("deactive");
        moon.classList.toggle("deactive");
darkmode.toggleDarkMode();
}