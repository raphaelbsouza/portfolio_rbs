// ========================================
// PORTFOLIO RAPHAEL - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initSmoothScrolling();
    initNavbarEffects();
    initMobileMenu();
    initContactForm();
    initSkillAnimations();
    initScrollAnimations();
    initTypingEffect();
    
    // Force initial navbar theme update
    updateNavbarTheme();
});

// ========================================
// THEME TOGGLE FUNCTIONALITY
// ========================================
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
        updateLogo(currentTheme);
    } else {
        // Set default logo for light theme
        updateLogo('light');
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        updateLogo(newTheme);
        
        // Force update navbar background to respect new theme
        updateNavbarTheme();
        
        // Add transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

// Force navbar and footer to update when theme changes
function updateNavbarTheme() {
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    
    // Force update navbar
    navbar.style.background = 'var(--navbar-bg)';
    navbar.style.backdropFilter = 'blur(10px)';
    
    // Force update footer
    footer.style.background = 'var(--footer-bg)';
    footer.style.color = 'var(--footer-text)';
    
    // Trigger a repaint to ensure variables are applied
    setTimeout(() => {
        navbar.style.background = 'var(--navbar-bg)';
        footer.style.background = 'var(--footer-bg)';
        footer.style.color = 'var(--footer-text)';
    }, 10);
}

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.innerHTML = icon;
}

function updateLogo(theme) {
    const logoImg = document.getElementById('logo-img');
    if (logoImg) {
        // bgescuro.png para tema claro, bgoffclaro.png para tema escuro
        const logoSrc = theme === 'dark' ? 'imgs/bgoffclaro.png' : 'imgs/bgescuro.png';
        logoImg.src = logoSrc;
    }
}

// ========================================
// SMOOTH SCROLLING
// ========================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navbar = document.querySelector('.navbar');
                const headerOffset = navbar.offsetHeight + 20; // Dynamic offset
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                // Ensure navbar is visible during navigation
                navbar.style.transform = 'translateY(0)';
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this.getAttribute('href'));
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.querySelector('i').className = 'fas fa-bars';
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });
}

function updateActiveNavLink(targetHref) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`a[href="${targetHref}"]`)?.classList.add('active');
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Change icon
        const icon = navMenu.classList.contains('active') ? 'fa-times' : 'fa-bars';
        this.querySelector('i').className = `fas ${icon}`;
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
            document.body.style.overflow = 'auto';
        }
    });
}

// ========================================
// NAVBAR EFFECTS
// ========================================
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        // Force navbar to always respect theme colors
        navbar.style.background = 'var(--navbar-bg)';
        navbar.style.backdropFilter = 'blur(10px)';
        
        // Hide/show navbar on scroll direction (but keep visible near top)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        
        // Update active section in navbar
        updateActiveSection();
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Force initial navbar setup
    updateNavbar();
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`.nav-menu a[href="#${sectionId}"]`)?.classList.add('active');
        }
    });
}

// ========================================
// CONTACT FORM
// ========================================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (validateContactForm(formData)) {
            // Send via WhatsApp
            sendWhatsAppMessage(formData);
        }
    });
}

function sendWhatsAppMessage(data) {
    // Format message for WhatsApp
    const message = `*Nova mensagem do Portfolio!*

*Nome:* ${data.name}
*Email:* ${data.email}
*Assunto:* ${data.subject}

*Mensagem:*
${data.message}

---
_Enviado através do formulário de contato do portfolio_`;

    // WhatsApp number (your number)
    const whatsappNumber = '5584981371108';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    showFormSuccess();
    
    // Reset form
    document.querySelector('.contact-form').reset();
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name.trim()) errors.push('Nome é obrigatório');
    if (!data.email.trim() || !isValidEmail(data.email)) errors.push('Email válido é obrigatório');
    if (!data.subject.trim()) errors.push('Assunto é obrigatório');
    if (!data.message.trim()) errors.push('Mensagem é obrigatória');
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormLoading(isLoading) {
    const submitBtn = document.querySelector('.contact-form .btn');
    
    if (isLoading) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
    } else {
        submitBtn.innerHTML = 'Enviar Mensagem';
        submitBtn.disabled = false;
    }
}

function showFormSuccess() {
    showNotification('Redirecionando para WhatsApp! Sua mensagem será enviada diretamente.', 'success');
}

function showFormErrors(errors) {
    const errorMessage = errors.join(', ');
    showNotification(errorMessage, 'error');
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1002;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// ========================================
// SKILL ANIMATIONS
// ========================================
function initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(5deg)';
            this.querySelector('.skill-icon').style.transform = 'scale(1.2) rotate(-5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
            this.querySelector('.skill-icon').style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
                
                // Special animations for different elements
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('skill-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.animationDelay = delay + 'ms';
                    }, delay);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.stat-item, .skill-item, .project-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

function animateCounter(element) {
    const numberElement = element.querySelector('.stat-number');
    const finalNumber = parseInt(numberElement.textContent);
    const duration = 2000;
    const increment = finalNumber / (duration / 16);
    let currentNumber = 0;
    
    const updateCounter = () => {
        currentNumber += increment;
        if (currentNumber < finalNumber) {
            numberElement.textContent = Math.floor(currentNumber) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            numberElement.textContent = finalNumber + '+';
        }
    };
    
    updateCounter();
}

// ========================================
// TYPING EFFECT
// ========================================
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h2');
    const titles = [
        'Desenvolvedor Full Stack',
        'Estudante de Python',
        'Conhecimento em Django',
        'Criador de Soluções Web',
        'Integração de APIs',
        'Soluções Inovadoras',
    ];
    
    let currentTitleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeTitle() {
        const currentTitle = titles[currentTitleIndex];
        
        if (isDeleting) {
            heroTitle.textContent = currentTitle.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            heroTitle.textContent = currentTitle.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentTitle.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            typeSpeed = 500; // Pause before next title
        }
        
        setTimeout(typeTitle, typeSpeed);
    }
    
    // Start typing effect after initial animations
    setTimeout(typeTitle, 2000);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(function() {
    updateActiveSection();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ========================================
// KEYBOARD NAVIGATION
// ========================================
document.addEventListener('keydown', function(e) {
    // ESC key closes notifications
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            hideNotification(notification);
        }
    }
    
    // Theme toggle with 'T' key
    if (e.key.toLowerCase() === 't' && e.ctrlKey) {
        e.preventDefault();
        document.querySelector('.theme-toggle').click();
    }
});

// ========================================
// PERFORMANCE MONITORING
// ========================================
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Página carregada em: ${loadTime}ms`);
        });
    }
}

logPerformance();

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
    // Você pode enviar erros para um serviço de monitoramento aqui
});

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1003;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Improve focus visibility
    const style = document.createElement('style');
    style.textContent = `
        *:focus {
            outline: 2px solid var(--accent-color);
            outline-offset: 2px;
        }
        .skip-link:focus {
            top: 6px;
        }
    `;
    document.head.appendChild(style);
}

initAccessibility();

// ========================================
// EXPORT FOR EXTERNAL USE
// ========================================
window.PortfolioApp = {
    showNotification,
    updateTheme: function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    },
    scrollToSection: function(sectionId) {
        const target = document.querySelector(sectionId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
};