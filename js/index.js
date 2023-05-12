function create_bg_color(){
    var hue = Math.floor(Math.random() * 360);
    var pastel = 'hsl(' + hue + ', 100%, 80%)';
    document.getElementById('bg').style.backgroundColor=pastel;

}



function add_navbar_item(name, link, icon, color) {
  let navbar = document.getElementById("navbar");
  let navbar_inside =
    `<div class="nav-item" style="background-color: `+color+`;">
    <div class="nav-item-bg" ></div>
    <a href="`+link+`" target="_blank"><i class="`+icon+`"></i>`+name+`</a>
    </div>`;

  navbar.insertAdjacentHTML("beforeend", navbar_inside);
}
function add_card(card, card_text, card_link, card_desc,card_class,target) {
  let Card = document.getElementById(card);
  let card_inside =`
  <div class="body-card-text">
   <a href="`+card_link+`" class=" contrast" target="`+target+`">
      <h4 class="card-item-name">`+card_text+`</h4>
      <p class="card-item-desc `+card_class+`" id="hovered">`+card_desc+`</p>
      
   </a> 
  </div>
  `;
  Card.insertAdjacentHTML("beforeend", card_inside);
}




function changeTheme(){
    var sun = document.getElementById('sun');
    var moon = document.getElementById('moon');
    var doc =document.documentElement;
    if(doc.getAttribute("data-theme")=="dark")
    {
        sun.classList.add("active");
        moon.classList.remove("active");
        doc.setAttribute("data-theme","light");
    }
    else{
        sun.classList.remove("active");
        moon.classList.add("active");
        doc.setAttribute("data-theme","dark");
    }
  
}




document.querySelector("#randomize-color").onclick = function(){
  create_bg_color();
  
}
document.querySelector("#dark-mode-button").onclick = function(){
changeTheme();
}
create_bg_color();





// navbar items
add_navbar_item(
  "Spotify",
  "https://open.spotify.com/user/2154ymmagefyhjr35q7mjdxpy?si=5bc3bfe2951d41e3",
  "bi bi-spotify",
  "Green"
);
add_navbar_item(
  "Github",
  "https://github.com/rimexe0",
  "bi bi-github",
  "Black"
);
add_navbar_item(
  "Linkedin",
  "https://www.linkedin.com/in/rimexe/",
  "bi bi-linkedin",
  "#0077b5"
);

//about
add_card(
  "about-card",
  "Emir Ozturk",
  "#",
  "IEU Computer programming student in Turkey.","","_blank"
);

add_card("about-card","for cv","/cv.pdf","click here","cv-link","_blank");

// projects
add_card(
  "projects-card",
  "rimexe0.github.io",
  "https://github.com/rimexe0/rimexe0.github.io",
  "This website","","_blank"
);
add_card(
  "projects-card",
  "gameAge",
  "https://github.com/rimexe0/gameAge",
  "Steam inspired website for midterm made by mostly me","","_blank"
);
add_card(
  "projects-card",
  "java media player",
  "https://github.com/rimexe0/java-media-player",
  "This contains my frustration with javaFx and bearly working java code.","","_blank"
);
add_card(
  "projects-card",
  "gameshop",
  "https://github.com/rimexe0/gameshop",
  "Steam inspired game store app for my midterm","","_blank"
);
add_card(
  "projects-card",
  "oasis scraper",
  "https://github.com/rimexe0/oasis-scraper",
  "Simple program that gets oasis weekly schedule and sends it to google calendar","","_blank"
);

// blog
add_card(
  "blog-card",
  "work in progress",
  "/mdread.html",
  "Shis part is going to be the blog part where i post about stuff i make. But its not ready yet.","","_self"
);

