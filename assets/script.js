// Sticky Navigation Bar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    document.getElementById('scroll-progress').style.width = scrollPercent + '%';
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const profileImage = document.getElementById('profile-image');

themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    document.body.setAttribute('data-theme', isLight ? 'light' : 'dark');
    themeToggle.innerHTML = isLight ? '🌙' : '☀️';

    // Change the profile image based on the theme
    profileImage.src = isLight ? 'assets/processed_bw_image_2.jpg' : 'assets/processed_bw_image.jpg';
});