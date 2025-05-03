let currentReviewIndex = 0;
const reviews = document.querySelectorAll('.review');
const totalReviews = reviews.length;

function showNextReview() {
  reviews[currentReviewIndex].classList.remove('active');
  currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
  reviews[currentReviewIndex].classList.add('active');
}

setInterval(showNextReview, 4000);
