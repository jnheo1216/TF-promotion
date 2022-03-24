console.log("hrello world");

gsap.registerPlugin(ScrollTrigger); // 스크롤 플러그인 안정화
gsap.utils.toArray("section").forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top top", 
    pin: true,
    pinSpacing: false,
  });
});
ScrollTrigger.create({
  snap: 1 / 2
});