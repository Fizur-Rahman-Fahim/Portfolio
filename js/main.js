// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') {
            return;
        }

        e.preventDefault();
        const target = document.querySelector(targetId);
        if (!target) {
            return;
        }

        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar color change on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-sm');
    } else {
        navbar.classList.remove('shadow-sm');
    }
});

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const theme = localStorage.getItem('theme');

// Check for saved theme preference or respect OS theme setting
if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    darkModeToggle.setAttribute('aria-pressed', 'true');
    darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update toggle button icon
    darkModeToggle.innerHTML = newTheme === 'dark' ?
        '<i class="fas fa-sun"></i>' :
        '<i class="fas fa-moon"></i>';
    darkModeToggle.setAttribute('aria-pressed', newTheme === 'dark' ? 'true' : 'false');
    darkModeToggle.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (this.checkValidity()) {
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
            );
            window.location.href = `mailto:fizurrahman733433@gmail.com?subject=${subject}&body=${body}`;
        }

        this.classList.add('was-validated');
    });
}

// Add active class to nav items on scroll
window.addEventListener('scroll', function () {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Project filtering (if you add filter buttons later)
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));
});
