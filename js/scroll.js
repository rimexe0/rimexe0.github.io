let scrolldown = document.getElementById("scroll-down");

// When the user scrolls down 20px from the top of the document, show the button

projects=document.querySelector("#projects-card");
projects.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (projects.scrollTop > 20 || projects.scrollTop > 20) {
    scrolldown.style.opacity = "0";
  } else {
    scrolldown.style.opacity = "1";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}