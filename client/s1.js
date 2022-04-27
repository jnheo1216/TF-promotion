const { response } = require("express");

console.log("hrello world");

// gsap.registerPlugin(ScrollTrigger); // 스크롤 플러그인 안정화
// gsap.utils.toArray("section").forEach((section, i) => {
//   ScrollTrigger.create({
//     trigger: section,
//     start: "top top", 
//     pin: true,
//     pinSpacing: false,
//   });
// });
// ScrollTrigger.create({
//   snap: 1 / 2
// });

window.addEventListener("wheel", function(e){
  e.preventDefault();
},{passive : false});

let mHtml = $("html");
let page = 1;
mHtml.animate({scrollTop : 0},10);

$(window).on("wheel", function(e) {
  if(mHtml.is(":animated")) return;
  if(e.originalEvent.deltaY > 0) {
      if(page == 3) return;
      page++;
  } else if(e.originalEvent.deltaY < 0) {
      if(page == 1) return;
      page--;
  }
  var posTop =(page-1) * $(window).height();
  mHtml.animate({scrollTop : posTop});
});

/////////////////////////////////////////////

function printName () {
  const name = document.getElementById('name').value;
  document.getElementById('nameresult').innerText = name;
}

function getNames() {
  fetch('http://localhost:8080/api/users')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById('names').innerText = JSON.stringify(data.users);
    })
  
}
