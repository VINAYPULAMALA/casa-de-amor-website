// Common navbar scroll effect - adds bg-black class on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('bg-black');
  } else {
    navbar.classList.remove('bg-black');
  }
});

// FAQ functionality for pages that have FAQ sections
const questions = document.querySelectorAll('.faq-question');

questions.forEach(question => {
  question.addEventListener('click', () => {
    question.classList.toggle('active');
    const answer = question.nextElementSibling;
    answer.classList.toggle('open');
  });
});

// Reviews Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const reviewsCarousel = document.getElementById('reviewsCarousel');
  
  if (reviewsCarousel) {
    // Get visible cards only (CSS hides some on mobile)
    const getVisibleCards = () => {
      return Array.from(reviewsCarousel.children).filter(card => {
        const style = window.getComputedStyle(card);
        return style.display !== 'none';
      });
    };
    
    // Initial duplication
    const duplicateCards = () => {
      // Remove existing duplicates first
      const allCards = Array.from(reviewsCarousel.children);
      const originalCount = Math.floor(allCards.length / 2) || allCards.length;
      
      // Keep only original cards
      allCards.slice(originalCount).forEach(card => card.remove());
      
      // Duplicate visible cards
      const visibleCards = getVisibleCards();
      visibleCards.forEach(card => {
        const clone = card.cloneNode(true);
        reviewsCarousel.appendChild(clone);
      });
    };
    
    // Initial setup
    duplicateCards();
    
    // Re-duplicate on window resize for responsive behavior
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(duplicateCards, 250);
    });
    
    // Pause animation when page is not visible for performance
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        reviewsCarousel.style.animationPlayState = 'paused';
      } else {
        reviewsCarousel.style.animationPlayState = 'running';
      }
    });
  }
});