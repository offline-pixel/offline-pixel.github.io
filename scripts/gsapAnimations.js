document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
  
    document.querySelectorAll(".section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
  });
  