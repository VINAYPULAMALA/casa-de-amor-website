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