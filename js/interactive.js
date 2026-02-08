/**
 * ANAPHIE BUSINESS - Interactive Features
 * Micro-interactions, Loading States & Toast Notifications
 */

class AnaphieInteractive {
    constructor() {
        this.init();
        this.notificationCount = 1;
        this.setupEventListeners();
        this.initAnimations();
    }

    init() {
        console.log('🚀 ANAPHIE BUSINESS - Interactive Features Initialized');
    }

    setupEventListeners() {
        // Auto-hide notifications after delay
        document.addEventListener('DOMContentLoaded', () => {
            this.setupAutoNotifications();
            this.setupFormLoading();
            this.setupImageLazyLoading();
            this.setupCounterAnimations();
        });

        // Ripple effect for buttons
        document.querySelectorAll('.btn-modern').forEach(button => {
            this.addRippleEffect(button);
        });

        // Hover effects for cards
        document.querySelectorAll('.service-card, .zone-card, .testimonial-card').forEach(card => {
            this.addCardHoverEffect(card);
        });
    }

    // ================================
    // NOTIFICATION SYSTEM
    // ================================

    showNotification(type = 'info', title = 'Notification', message = '', duration = 5000) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toastId = `toast-${Date.now()}`;
        const toast = this.createToast(toastId, type, title, message);
        
        toastContainer.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Auto hide
        setTimeout(() => {
            this.hideToast(toastId);
        }, duration);

        // Update notification badge
        this.updateNotificationBadge();
    }

    createToast(id, type, title, message) {
        const toast = document.createElement('div');
        toast.id = id;
        toast.className = `toast-modern toast-${type}`;
        
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <div class="toast-header-modern">
                <div class="toast-title">
                    <i class="${iconMap[type]} me-2"></i>
                    ${title}
                </div>
                <button class="toast-close" onclick="anaphie.hideToast('${id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="toast-body-modern">
                ${message}
            </div>
            <div class="toast-progress">
                <div class="toast-progress-bar"></div>
            </div>
        `;

        return toast;
    }

    hideToast(toastId) {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.add('hide');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }
    }

    updateNotificationBadge() {
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            this.notificationCount++;
            badge.textContent = this.notificationCount;
            badge.style.display = 'flex';
            
            // Hide badge after 3 seconds
            setTimeout(() => {
                badge.style.display = 'none';
            }, 3000);
        }
    }

    setupAutoNotifications() {
        // Welcome notification
        setTimeout(() => {
            this.showNotification('info', 'Bienvenue !', 'Découvrez nos services de fret international Dubaï–Kinshasa');
        }, 2000);

        // Service recommendation
        setTimeout(() => {
            this.showNotification('success', 'Offre Spéciale', '🎉 Devis gratuit et réponse sous 24h !');
        }, 8000);

        // Trust signal
        setTimeout(() => {
            this.showNotification('warning', '⚡ Service Rapide', 'Livraison express disponible 24/7');
        }, 15000);
    }

    // ================================
    // LOADING STATES
    // ================================

    simulateLoading(element, destination) {
        event.preventDefault();
        
        // Add loading state
        element.classList.add('btn-loading');
        const originalText = element.innerHTML;
        
        // Show loading notification
        this.showNotification('info', 'Chargement...', 'Redirection vers la page de contact');

        // Simulate loading time
        setTimeout(() => {
            element.classList.remove('btn-loading');
            element.innerHTML = originalText;
            
            // Success notification
            this.showNotification('success', 'Prêt !', 'Vous allez être redirigé...');
            
            // Actual navigation
            setTimeout(() => {
                window.location.href = destination;
            }, 1000);
        }, 2000);
    }

    setupFormLoading() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    }

    handleFormSubmit(form) {
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (!submitBtn) return;

        // Add loading state to form
        form.classList.add('form-loading');
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;

        // Show loading notification
        this.showNotification('info', 'Envoi en cours', 'Traitement de votre demande...');

        // Simulate form submission
        setTimeout(() => {
            form.classList.remove('form-loading');
            submitBtn.classList.remove('btn-loading');
            submitBtn.disabled = false;

            // Success notification
            this.showNotification('success', '✅ Succès !', 'Votre demande a été envoyée avec succès. Nous vous répondrons dans les 24h.');
            
            // Reset form
            form.reset();
        }, 3000);
    }

    setupImageLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('img-loading');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.classList.add('img-loading');
            imageObserver.observe(img);
        });
    }

    // ================================
    // MICRO-INTERACTIONS
    // ================================

    addRippleEffect(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    addCardHoverEffect(card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });

        card.addEventListener('click', () => {
            this.showNotification('info', 'Service Sélectionné', 'Plus d\'informations disponibles sur la page dédiée');
        });
    }

    // ================================
    // COUNTER ANIMATIONS
    // ================================

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (element.textContent.includes('/')) {
                element.textContent = Math.floor(current) + '/7';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ================================
    // SCROLL ANIMATIONS
    // ================================

    initAnimations() {
        // Enhanced scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.visibility = 'visible';
                    entry.target.classList.add('animate__animated');
                    
                    // Add stagger effect for multiple elements
                    const delay = entry.target.dataset.delay || 0;
                    entry.target.style.animationDelay = delay + 'ms';
                    
                    animationObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate__animated, .service-card, .zone-card, .testimonial-card').forEach(el => {
            el.style.visibility = 'hidden';
            animationObserver.observe(el);
        });
    }

    // ================================
    // UTILITY FUNCTIONS
    // ================================

    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Global functions for inline onclick handlers
function showNotification(type, title, message) {
    anaphie.showNotification(type, title, message);
}

function simulateLoading(element, destination) {
    anaphie.simulateLoading(element, destination);
}

// Initialize the interactive features
const anaphie = new AnaphieInteractive();

// Export for global access
window.anaphie = anaphie;
window.showNotification = showNotification;
window.simulateLoading = simulateLoading;
