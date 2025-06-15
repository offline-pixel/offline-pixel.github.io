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
const animationDuration = '5s'; // Duration of the background animation

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    slide.classList.add("inactive"); // Add inactive class for pausing animation
    slide.style.animationName = ''; // Reset animation name
    dots[i].classList.remove("active");
  });

  slides[index].classList.add("active");
  slides[index].classList.remove("inactive"); // Remove inactive class from active slide
  dots[index].classList.add("active");

  // Apply background animation based on the slide index
  switch (index) {
    case 0:
      slides[index].style.animationName = 'slide1BgAnimation';
      slides[index].style.animationDuration = animationDuration;
      slides[index].style.animationTimingFunction = 'ease-in-out';
      slides[index].style.animationIterationCount = 'infinite';
      slides[index].style.animationDirection = 'alternate';
      break;
    case 1:
      slides[index].style.animationName = 'slide2BgAnimation';
      slides[index].style.animationDuration = animationDuration;
      slides[index].style.animationTimingFunction = 'ease-in-out';
      slides[index].style.animationIterationCount = 'infinite';
      slides[index].style.animationDirection = 'alternate';
      break;
    case 2:
      slides[index].style.animationName = 'slide3BgAnimation';
      slides[index].style.animationDuration = animationDuration;
      slides[index].style.animationTimingFunction = 'ease-in-out';
      slides[index].style.animationIterationCount = 'infinite';
      slides[index].style.animationDirection = 'alternate';
      break;
    case 3:
      slides[index].style.animationName = 'slide4BgAnimation';
      slides[index].style.animationDuration = animationDuration;
      slides[index].style.animationTimingFunction = 'ease-in-out';
      slides[index].style.animationIterationCount = 'infinite';
      slides[index].style.animationDirection = 'alternate';
      break;
    case 4:
      slides[index].style.animationName = 'slide5BgAnimation';
      slides[index].style.animationDuration = animationDuration;
      slides[index].style.animationTimingFunction = 'ease-in-out';
      slides[index].style.animationIterationCount = 'infinite';
      slides[index].style.animationDirection = 'alternate';
      break;
    default:
      slides[index].style.animationName = ''; // No animation for unknown index
      break;
  }

  // Animate in GSAP
  gsap.fromTo(slides[index].querySelector(".hero-title"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
  gsap.fromTo(slides[index].querySelector(".hero-description"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2 });
  gsap.fromTo(slides[index].querySelector(".hero-benefits"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.4 });

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