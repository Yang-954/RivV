document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initTabs();
    initExpandables();
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initContactForm();
    initScrollAnimations();
    initImageInteractions();
});

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;

        particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;

        particle.style.opacity = Math.random() * 0.5 + 0.1;

        const hue = Math.random() * 30 + 200;
        particle.style.background = `hsl(${hue}, 70%, 60%)`;

        particlesContainer.appendChild(particle);
    }
}

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab + '-panel') {
                    panel.classList.add('active');
                }
            });
        });
    });
}

function initExpandables() {
    const expandables = document.querySelectorAll('.expandable');

    expandables.forEach(item => {
        const header = item.querySelector('.expandable-header');

        header.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            expandables.forEach(ex => ex.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileMenu || !navLinks) return;

    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');

        const spans = mobileMenu.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.style.transform = navLinks.classList.contains('active')
                ? index === 0 ? 'rotate(45deg) translate(5px, 5px)'
                : index === 1 ? 'opacity: 0'
                : 'rotate(-45deg) translate(7px, -6px)'
                : 'none';
        });
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = mobileMenu.querySelectorAll('span');
            spans.forEach(span => span.style.transform = 'none');
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });

            const activeLink = document.querySelector(`.nav-links a[href="${targetId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        });
    });
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(74, 144, 217, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.96)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        const name = data.name.trim();
        const email = data.email.trim();
        const message = data.message.trim();

        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        showNotification('Thank you for your message! We will get back to you soon.', 'success');

        form.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 350px;
    `;

    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #dc3545 0%, #e83e8c 100%)';
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                const animateElements = entry.target.querySelectorAll('.member-card, .value-card, .process-step, .step-images img');
                animateElements.forEach((el, index) => {
                    el.style.animationDelay = `${index * 0.1}s`;
                    el.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.team-section, .principle-section, .process-section, .values-content').forEach(section => {
        section.classList.add('scroll-animate');
        observer.observe(section);
    });

    const style = document.createElement('style');
    style.textContent = `
        .scroll-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .scroll-animate.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .animate-in {
            animation: fadeInUp 0.5s ease-out forwards;
            opacity: 0;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    if (!track || dots.length === 0) return;

    let currentIndex = 0;
    const totalSlides = dots.length;
    let autoPlayInterval;

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % totalSlides;
        goToSlide(nextIndex);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    const carousel = document.querySelector('.device-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
}

function initImageInteractions() {
    initCarousel();
    
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const storyImages = document.querySelectorAll('.story-img, .step-images img, .future-img');
    storyImages.forEach(img => {
        img.style.cursor = 'pointer';

        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${this.src}" alt="${this.alt}">
                    <span class="modal-close">&times;</span>
                </div>
            `;

            const modalStyle = document.createElement('style');
            modalStyle.textContent = `
                .image-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease-out;
                }
                .modal-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                .modal-content img {
                    max-width: 100%;
                    max-height: 90vh;
                    border-radius: 10px;
                    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
                }
                .modal-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    font-size: 40px;
                    color: white;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }
                .modal-close:hover {
                    color: #4a90d9;
                }
            `;
            document.head.appendChild(modalStyle);

            document.body.appendChild(modal);

            modal.querySelector('.modal-close').addEventListener('click', function() {
                modal.remove();
                modalStyle.remove();
            });

            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                    modalStyle.remove();
                }
            });

            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    modal.remove();
                    modalStyle.remove();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });

    const innovationsItems = document.querySelectorAll('.innovations li');
    innovationsItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('fadeInLeft');
    });

    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.3}s`;
    });

    console.log('RivV Website initialized successfully!');
};
