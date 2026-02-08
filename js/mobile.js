/**
 * ANAPHIE BUSINESS - Mobile Features & Swipe Gestures
 * Navigation mobile améliorée et gestes tactiles modernes
 */

class AnaphieMobile {
    constructor() {
        this.init();
        this.setupMobileNavigation();
        this.setupSwipeGestures();
        this.setupPullToRefresh();
        this.setupTouchFeedback();
    }

    init() {
        console.log('📱 ANAPHIE BUSINESS - Mobile Features Initialized');
        this.currentTestimonial = 0;
        this.currentService = 0;
        this.isPulling = false;
        this.pullStartY = 0;
        this.pullDistance = 0;
    }

    // ================================
    // NAVIGATION MOBILE AMÉLIORÉE
    // ================================

    setupMobileNavigation() {
        // Sticky navigation on scroll
        this.setupStickyNavigation();
        
        // Hamburger menu animation
        this.setupHamburgerAnimation();
        
        // Mobile search functionality
        this.setupMobileSearch();
        
        // Bottom navigation active states
        this.setupBottomNavigation();
    }

    setupStickyNavigation() {
        const navbar = document.getElementById('mainNavbar');
        if (!navbar) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateNavbar = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 300) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    setupHamburgerAnimation() {
        const toggler = document.getElementById('mobileToggler');
        const collapse = document.getElementById('navbarNav');
        
        if (!toggler || !collapse) return;

        // Toggle animation class
        collapse.addEventListener('show.bs.collapse', () => {
            toggler.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });

        collapse.addEventListener('hide.bs.collapse', () => {
            toggler.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        });

        // Touch feedback
        toggler.addEventListener('touchstart', () => {
            toggler.style.transform = 'scale(0.95)';
        });

        toggler.addEventListener('touchend', () => {
            toggler.style.transform = 'scale(1)';
        });
    }

    setupMobileSearch() {
        const searchInput = document.querySelector('.search-input');
        if (!searchInput) return;

        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });

        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.style.transform = 'scale(1.02)';
        });

        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.style.transform = 'scale(1)';
        });
    }

    performSearch(query) {
        if (query.length < 2) return;
        
        // Show search notification
        if (window.anaphie) {
            window.anaphie.showNotification('info', 'Recherche', `Recherche de "${query}"...`);
        }

        // Simulate search results
        setTimeout(() => {
            if (window.anaphie) {
                window.anaphie.showNotification('success', 'Résultats', `3 services trouvés pour "${query}"`);
            }
        }, 1000);
    }

    setupBottomNavigation() {
        const bottomNavLinks = document.querySelectorAll('.mobile-menu-bar .nav-link');
        
        bottomNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Remove active class from all links
                bottomNavLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Add touch feedback
                this.addTouchFeedback(link);
            });
        });
    }

    // ================================
    // SWIPE GESTURES MODERNES
    // ================================

    setupSwipeGestures() {
        this.setupTestimonialSwipe();
        this.setupServiceSwipe();
        this.setupZoneCardsSwipe();
    }

    setupTestimonialSwipe() {
        const container = document.querySelector('.testimonials-swipe-container');
        const wrapper = document.querySelector('.testimonials-swipe-wrapper');
        
        if (!container || !wrapper) return;

        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        const handleStart = (e) => {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            container.style.cursor = 'grabbing';
        };

        const handleMove = (e) => {
            if (!isDragging) return;
            
            e.preventDefault();
            currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const diffX = currentX - startX;
            
            // Apply transform with resistance
            const resistance = 0.3;
            wrapper.style.transform = `translateX(${diffX * resistance}px)`;
        };

        const handleEnd = () => {
            if (!isDragging) return;
            
            isDragging = false;
            container.style.cursor = 'grab';
            
            const diffX = currentX - startX;
            const threshold = 50;
            
            // Reset position
            wrapper.style.transform = '';
            
            // Determine swipe direction
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.previousTestimonial();
                } else {
                    this.nextTestimonial();
                }
            }
        };

        // Mouse events
        container.addEventListener('mousedown', handleStart);
        container.addEventListener('mousemove', handleMove);
        container.addEventListener('mouseup', handleEnd);
        container.addEventListener('mouseleave', handleEnd);

        // Touch events
        container.addEventListener('touchstart', handleStart, { passive: true });
        container.addEventListener('touchmove', handleMove, { passive: false });
        container.addEventListener('touchend', handleEnd);
    }

    setupServiceSwipe() {
        const container = document.querySelector('.services-preview');
        if (!container) return;

        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        const handleStart = (e) => {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        };

        const handleMove = (e) => {
            if (!isDragging) return;
            
            e.preventDefault();
            currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const diffX = currentX - startX;
            
            // Apply horizontal scroll
            container.scrollLeft -= diffX * 0.5;
        };

        const handleEnd = () => {
            isDragging = false;
        };

        // Touch events for mobile
        container.addEventListener('touchstart', handleStart, { passive: true });
        container.addEventListener('touchmove', handleMove, { passive: false });
        container.addEventListener('touchend', handleEnd);
    }

    setupZoneCardsSwipe() {
        const zoneCards = document.querySelectorAll('.zone-card');
        
        zoneCards.forEach(card => {
            let startX = 0;
            let startY = 0;
            
            const handleStart = (e) => {
                startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            };
            
            const handleEnd = (e) => {
                const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
                const endY = e.type.includes('mouse') ? e.clientY : e.changedTouches[0].clientY;
                
                const diffX = endX - startX;
                const diffY = endY - startY;
                
                // Detect swipe
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        // Swipe right - show next zone
                        this.showNextZone(card);
                    } else {
                        // Swipe left - show previous zone
                        this.showPreviousZone(card);
                    }
                }
            };
            
            card.addEventListener('touchstart', handleStart, { passive: true });
            card.addEventListener('touchend', handleEnd);
        });
    }

    // ================================
    // PULL-TO-REFRESH
    // ================================

    setupPullToRefresh() {
        const pullToRefresh = document.getElementById('pullToRefresh');
        if (!pullToRefresh) return;

        let startY = 0;
        let isPulling = false;

        const handleStart = (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].clientY;
                isPulling = true;
            }
        };

        const handleMove = (e) => {
            if (!isPulling) return;
            
            const currentY = e.touches[0].clientY;
            const pullDistance = currentY - startY;
            
            if (pullDistance > 0 && window.scrollY === 0) {
                e.preventDefault();
                
                if (pullDistance > 100) {
                    pullToRefresh.classList.add('active');
                    pullToRefresh.querySelector('span').textContent = 'Relâcher pour rafraîchir';
                } else {
                    pullToRefresh.classList.remove('active');
                    pullToRefresh.querySelector('span').textContent = 'Tirer pour rafraîchir';
                }
                
                pullToRefresh.style.transform = `translateY(${Math.min(pullDistance * 0.5, 60)}px)`;
            }
        };

        const handleEnd = () => {
            if (!isPulling) return;
            
            isPulling = false;
            
            if (pullToRefresh.classList.contains('active')) {
                this.performRefresh();
            }
            
            pullToRefresh.classList.remove('active');
            pullToRefresh.style.transform = '';
            pullToRefresh.querySelector('span').textContent = 'Tirer pour rafraîchir';
        };

        document.addEventListener('touchstart', handleStart, { passive: true });
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleEnd);
    }

    performRefresh() {
        if (window.anaphie) {
            window.anaphie.showNotification('info', 'Actualisation', 'Mise à jour du contenu...');
        }

        // Simulate refresh
        setTimeout(() => {
            location.reload();
        }, 1500);
    }

    // ================================
    // TOUCH FEEDBACK
    // ================================

    setupTouchFeedback() {
        const touchElements = document.querySelectorAll('.touch-feedback, .btn-modern, .nav-link');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                this.addTouchFeedback(element, e);
            });
        });
    }

    addTouchFeedback(element, event) {
        element.classList.add('active');
        
        setTimeout(() => {
            element.classList.remove('active');
        }, 600);
    }

    // ================================
    // SWIPE NAVIGATION FUNCTIONS
    // ================================

    nextTestimonial() {
        const totalTestimonials = 3;
        this.currentTestimonial = (this.currentTestimonial + 1) % totalTestimonials;
        this.updateTestimonialPosition();
    }

    previousTestimonial() {
        const totalTestimonials = 3;
        this.currentTestimonial = (this.currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        this.updateTestimonialPosition();
    }

    goToTestimonial(index) {
        this.currentTestimonial = index;
        this.updateTestimonialPosition();
    }

    updateTestimonialPosition() {
        const wrapper = document.querySelector('.testimonials-swipe-wrapper');
        const indicators = document.querySelectorAll('.swipe-indicator');
        
        if (!wrapper) return;

        // Update position
        const offset = -this.currentTestimonial * 100;
        wrapper.style.transform = `translateX(${offset}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentTestimonial);
        });

        // Show notification
        if (window.anaphie) {
            const testimonialNames = ['Jean Mbuyu', 'Marie Nsumba', 'Ahmed Hassan'];
            window.anaphie.showNotification('info', 'Témoignage', `Affichage: ${testimonialNames[this.currentTestimonial]}`);
        }
    }

    showNextZone(currentCard) {
        const allCards = Array.from(document.querySelectorAll('.zone-card'));
        const currentIndex = allCards.indexOf(currentCard);
        const nextIndex = (currentIndex + 1) % allCards.length;
        
        // Highlight next card
        allCards[nextIndex].style.transform = 'scale(1.05)';
        setTimeout(() => {
            allCards[nextIndex].style.transform = '';
        }, 300);
        
        if (window.anaphie) {
            const zoneNames = ['Kinshasa', 'Dubaï', 'Matadi'];
            window.anaphie.showNotification('info', 'Zone Suivante', zoneNames[nextIndex]);
        }
    }

    showPreviousZone(currentCard) {
        const allCards = Array.from(document.querySelectorAll('.zone-card'));
        const currentIndex = allCards.indexOf(currentCard);
        const prevIndex = (currentIndex - 1 + allCards.length) % allCards.length;
        
        // Highlight previous card
        allCards[prevIndex].style.transform = 'scale(1.05)';
        setTimeout(() => {
            allCards[prevIndex].style.transform = '';
        }, 300);
        
        if (window.anaphie) {
            const zoneNames = ['Kinshasa', 'Dubaï', 'Matadi'];
            window.anaphie.showNotification('info', 'Zone Précédente', zoneNames[prevIndex]);
        }
    }

    // ================================
    // UTILITY FUNCTIONS
    // ================================

    isMobile() {
        return window.innerWidth <= 768;
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // Auto-hide swipe hints after first interaction
    hideSwipeHints() {
        setTimeout(() => {
            const hints = document.querySelectorAll('.swipe-hint');
            hints.forEach(hint => {
                hint.style.display = 'none';
            });
        }, 10000); // Hide after 10 seconds
    }
}

// Global functions for swipe navigation
function nextTestimonial() {
    anaphieMobile.nextTestimonial();
}

function previousTestimonial() {
    anaphieMobile.previousTestimonial();
}

function goToTestimonial(index) {
    anaphieMobile.goToTestimonial(index);
}

// Initialize mobile features
const anaphieMobile = new AnaphieMobile();

// Export for global access
window.anaphieMobile = anaphieMobile;
window.nextTestimonial = nextTestimonial;
window.previousTestimonial = previousTestimonial;
window.goToTestimonial = goToTestimonial;
