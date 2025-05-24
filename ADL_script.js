// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollTop = 0;
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// Particle Background Animation
function createParticleBackground() {
    const particleContainer = document.querySelector('.particle-background');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
        `;
        particleContainer.appendChild(particle);
    }
}

// Intersection Observer for Fade-In Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Form Submission Handler
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual form submission logic)
    await new Promise(resolve => setTimeout(resolve, 1500));

    submitButton.textContent = 'Message Sent!';
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        contactForm.reset();
    }, 2000);
});

// Add scroll progress indicator
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progress.style.transform = `scaleX(${scrolled / 100})`;
    });
};

// Create floating shapes in hero section
const createFloatingShapes = () => {
    const shapes = document.createElement('div');
    shapes.className = 'floating-shapes';
    document.querySelector('.hero').appendChild(shapes);

    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        shape.style.cssText = `
            position: absolute;
            width: ${Math.random() * 20 + 10}px;
            height: ${Math.random() * 20 + 10}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1});
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            border-radius: 50%;
            animation: float ${Math.random() * 5 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        shapes.appendChild(shape);
    }
};

// Enhanced section visibility observer
const createSectionObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('tech-grid')) {
                    entry.target.querySelectorAll('.tech-card').forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
};

// Parallax effect for hero section
const createParallax = () => {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPosition = `50% ${scrolled * 0.5}px`;
        }
    });
};

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    createScrollProgress();
    createFloatingShapes();
    createSectionObserver();
    createParallax();
    
    // Your existing initialization code...
    createParticleBackground();
});

// Add hover effect to tech cards
document.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add scroll-triggered animations for statistics
const stats = document.querySelectorAll('.stat-card h3');
let animated = false;

function animateStats() {
    if (animated) return;
    
    stats.forEach(stat => {
        const originalText = stat.textContent;
        const target = parseFloat(originalText.replace(/[^0-9.]/g, ''));
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const step = duration / 100;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (originalText.includes('~')) {
                    stat.textContent = current.toFixed(1) > 1000 ? 
                        `~$${(current/1000).toFixed(1)}T+` : 
                        `~$${current.toFixed(0)}B+`;
                } else {
                    stat.textContent = current.toFixed(1) > 1000 ? 
                        `$${(current/1000).toFixed(1)}T+` : 
                        `$${current.toFixed(0)}B+`;
                }
                setTimeout(updateCounter, step);
            } else {
                stat.textContent = originalText; // Restore the original text exactly
            }
        };
        
        updateCounter();
    });
    
    animated = true;
}

// Trigger stats animation when the market section is in view
const marketSection = document.querySelector('.market-section');
const marketObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateStats();
    }
}, { threshold: 0.5 });

marketObserver.observe(marketSection); 