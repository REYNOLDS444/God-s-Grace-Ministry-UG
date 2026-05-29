// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }
        
        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// CTA Button functionality
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Add scroll animation for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and about cards
document.querySelectorAll('.service-card, .about-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Mobile menu toggle (optional enhancement for future mobile nav)
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    
    // Add mobile-friendly touch support
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop) {
            // Scrolling DOWN - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling UP - show navbar
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
    
    navbar.style.transition = 'transform 0.3s ease';
}

// Initialize mobile menu
initMobileMenu();

// Log page load
console.log('Hope Vision Charity Group Uganda Website loaded successfully!');

// Scroll-to-top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Gallery modal functionality
(function() {
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('imgModalImg');
    const caption = document.getElementById('imgModalCaption');
    const closeBtn = document.getElementById('imgModalClose');

    if (!modal || !modalImg) return;

    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            modalImg.alt = this.alt || '';
            caption.textContent = this.alt || '';
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.style.display = 'none';
        modalImg.src = '';
        caption.textContent = '';
        document.body.style.overflow = '';
    }

    closeBtn && closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
})();
