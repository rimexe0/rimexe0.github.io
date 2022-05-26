function copyDiscord() {
   navigator.clipboard.writeText("rime#2371") ;
   var x = document.getElementById("toast");
   x.className = "show";
   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  document.getElementById("Discord").addEventListener("click", copyDiscord);