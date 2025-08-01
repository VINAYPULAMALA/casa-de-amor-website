// Functions page specific navbar scroll effect - adds navbar-fixed class
window.onscroll = function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {  // Change 50px to the scroll position you want
        navbar.classList.add('navbar-fixed');
    } else {
        navbar.classList.remove('navbar-fixed');
    }
};