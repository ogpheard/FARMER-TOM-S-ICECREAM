// Navigation scroll effect and darkening overlay
let lastScroll = 0;
const nav = document.querySelector('.nav');
const darkeningOverlay = document.querySelector('.scroll-darkening-overlay');
const heroVideo = document.querySelector('.hero-video');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Show navigation only when scrolling down from hero
    if (currentScroll > 100) {
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }

    // Video darkening effect - darken as you scroll down
    if (currentScroll < windowHeight) {
        const scrollProgress = currentScroll / windowHeight;
        const brightness = 1 - (scrollProgress * 0.6); // Darken up to 60%
        if (heroVideo) {
            heroVideo.style.filter = `brightness(${brightness})`;
        }
    } else {
        if (heroVideo) {
            heroVideo.style.filter = 'brightness(0.4)';
        }
    }

    // Darkening overlay effect - starts after hero section
    if (currentScroll > windowHeight) {
        const scrollDistance = currentScroll - windowHeight;
        const maxDarkness = 600;
        const opacity = Math.min(scrollDistance / maxDarkness, 0.6);
        darkeningOverlay.style.opacity = opacity;
    } else {
        darkeningOverlay.style.opacity = 0;
    }

    lastScroll = currentScroll;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scroll animations on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe category cards and award items
document.addEventListener('DOMContentLoaded', () => {
    const categoryCards = document.querySelectorAll('.category-card');
    const awardItems = document.querySelectorAll('.award-item');

    categoryCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    awardItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });
});
