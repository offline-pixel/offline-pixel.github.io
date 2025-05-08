const reviews = document.querySelectorAll('.review');
let currentReviewIndex = 0;
const totalReviews = reviews.length;

if (totalReviews > 0) {
  function showNextReview() {
    reviews[currentReviewIndex].classList.remove('active');
    currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
    reviews[currentReviewIndex].classList.add('active');
  }

  setInterval(showNextReview, 4000);
}

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
      dots[i].classList.add("active");

      // Animate in GSAP
      gsap.fromTo(slide.querySelector(".hero-title"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
      gsap.fromTo(slide.querySelector(".hero-description"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2 });
      gsap.fromTo(slide.querySelector(".hero-benefits"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.4 });
    }
  });
  current = index;
}

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.dataset.index);
    showSlide(index);
  });
});

// Auto-play (optional)
setInterval(() => {
  showSlide((current + 1) % slides.length);
}, 12000);

// Initial animation
showSlide(0);
