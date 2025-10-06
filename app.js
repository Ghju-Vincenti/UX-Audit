class PresentationController {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 15;
        this.isAnimating = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateUI();
        this.triggerSlideAnimations();
    }

    initializeElements() {
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');
        this.currentSlideEl = document.getElementById('currentSlide');
        this.totalSlidesEl = document.getElementById('totalSlides');
        this.progressFill = document.getElementById('progressFill');
        this.agendaItems = document.querySelectorAll('.agenda-item');
        
        // Set total slides
        this.totalSlidesEl.textContent = this.totalSlides;
    }

    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isAnimating) return;
            
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
                case 'f':
                case 'F':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
            }
        });

        // Handle F11 separately as it may be handled differently by browsers
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F11') {
                e.preventDefault();
                this.toggleFullscreen();
            }
        });

        // Agenda navigation
        this.agendaItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetSlide = parseInt(item.dataset.target);
                if (targetSlide) {
                    this.goToSlide(targetSlide);
                }
            });
        });

        // Touch/swipe support
        this.setupTouchEvents();

        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', () => this.updateFullscreenButton());
        document.addEventListener('webkitfullscreenchange', () => this.updateFullscreenButton());
        document.addEventListener('mozfullscreenchange', () => this.updateFullscreenButton());
        document.addEventListener('MSFullscreenChange', () => this.updateFullscreenButton());
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (this.isAnimating) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Only handle horizontal swipes
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        }, { passive: true });
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides || slideNumber === this.currentSlide || this.isAnimating) {
            return;
        }

        this.isAnimating = true;
        
        // Remove active class from current slide
        const currentSlideEl = document.querySelector(`.slide[data-slide="${this.currentSlide}"]`);
        if (currentSlideEl) {
            currentSlideEl.classList.remove('active');
        }

        // Update current slide
        this.currentSlide = slideNumber;

        // Add active class to new slide
        const newSlideEl = document.querySelector(`.slide[data-slide="${this.currentSlide}"]`);
        if (newSlideEl) {
            // Small delay to ensure smooth transition
            setTimeout(() => {
                newSlideEl.classList.add('active');
                this.triggerSlideAnimations();
                this.updateUI();
                
                // Reset animation flag after transition
                setTimeout(() => {
                    this.isAnimating = false;
                }, 600);
            }, 50);
        }
    }

    updateUI() {
        // Update slide counter
        this.currentSlideEl.textContent = this.currentSlide;
        
        // Update progress bar
        const progress = (this.currentSlide / this.totalSlides) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;
        
        if (this.currentSlide === 1) {
            this.prevBtn.style.opacity = '0.5';
        } else {
            this.prevBtn.style.opacity = '1';
        }
        
        if (this.currentSlide === this.totalSlides) {
            this.nextBtn.style.opacity = '0.5';
        } else {
            this.nextBtn.style.opacity = '1';
        }
    }

    updateFullscreenButton() {
        const isFullscreen = !!(document.fullscreenElement || 
                                document.webkitFullscreenElement || 
                                document.mozFullScreenElement || 
                                document.msFullscreenElement);
        
        if (isFullscreen) {
            this.fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            this.fullscreenBtn.title = 'Quitter le plein écran';
        } else {
            this.fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            this.fullscreenBtn.title = 'Plein écran';
        }
    }

    async toggleFullscreen() {
        try {
            const isFullscreen = !!(document.fullscreenElement || 
                                    document.webkitFullscreenElement || 
                                    document.mozFullScreenElement || 
                                    document.msFullscreenElement);
            
            if (!isFullscreen) {
                // Enter fullscreen
                const element = document.documentElement;
                
                if (element.requestFullscreen) {
                    await element.requestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    await element.webkitRequestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    await element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    await element.msRequestFullscreen();
                } else {
                    // Fallback for browsers that don't support fullscreen API
                    this.simulateFullscreen();
                }
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    await document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    await document.msExitFullscreen();
                } else {
                    this.exitSimulatedFullscreen();
                }
            }
        } catch (err) {
            console.log(`Fullscreen error: ${err.message}`);
            // Fallback to simulated fullscreen
            this.simulateFullscreen();
        }
    }

    simulateFullscreen() {
        const container = document.querySelector('.presentation-container');
        if (container.classList.contains('simulated-fullscreen')) {
            this.exitSimulatedFullscreen();
        } else {
            container.classList.add('simulated-fullscreen');
            container.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 9999 !important;
                background: var(--color-background) !important;
            `;
            document.body.style.overflow = 'hidden';
            this.fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            this.fullscreenBtn.title = 'Quitter le plein écran';
        }
    }

    exitSimulatedFullscreen() {
        const container = document.querySelector('.presentation-container');
        container.classList.remove('simulated-fullscreen');
        container.style.cssText = '';
        document.body.style.overflow = '';
        this.fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        this.fullscreenBtn.title = 'Plein écran';
    }

    triggerSlideAnimations() {
        const activeSlide = document.querySelector('.slide.active');
        if (!activeSlide) return;

        // Reset all animations first
        this.resetAnimations(activeSlide);
        
        // Trigger animations based on slide content
        setTimeout(() => {
            this.animateProgressBars(activeSlide);
            this.animateGauges(activeSlide);
            this.animateKPIs(activeSlide);
            this.animateUXBars(activeSlide);
            this.animateCards(activeSlide);
        }, 300);
    }

    resetAnimations(slide) {
        // Reset progress bars
        const progressFills = slide.querySelectorAll('.progress-fill, .ux-fill, .kpi-current');
        progressFills.forEach(fill => {
            fill.style.width = '0';
        });
        
        // Reset gauge animations
        const gauges = slide.querySelectorAll('.gauge');
        gauges.forEach(gauge => {
            gauge.style.background = `conic-gradient(var(--color-error) 0deg, var(--color-error) 0deg, var(--color-secondary) 0deg 360deg)`;
        });
    }

    animateProgressBars(slide) {
        const progressFills = slide.querySelectorAll('.progress-fill');
        progressFills.forEach(fill => {
            const width = fill.dataset.width;
            if (width) {
                setTimeout(() => {
                    fill.style.width = `${width}%`;
                }, 200);
            }
        });
    }

    animateGauges(slide) {
        const gauges = slide.querySelectorAll('.gauge');
        gauges.forEach(gauge => {
            const value = gauge.dataset.value;
            if (value) {
                setTimeout(() => {
                    const degrees = (parseInt(value) / 100) * 360;
                    gauge.style.background = `conic-gradient(var(--color-error) 0deg, var(--color-error) ${degrees}deg, var(--color-secondary) ${degrees}deg 360deg)`;
                }, 500);
            }
        });
    }

    animateKPIs(slide) {
        const kpiCurrents = slide.querySelectorAll('.kpi-current');
        kpiCurrents.forEach((current, index) => {
            const width = current.dataset.width;
            if (width) {
                setTimeout(() => {
                    current.style.width = `${width}%`;
                }, 300 + (index * 200));
            }
        });
    }

    animateUXBars(slide) {
        const uxFills = slide.querySelectorAll('.ux-fill');
        uxFills.forEach((fill, index) => {
            const width = fill.dataset.width;
            if (width) {
                setTimeout(() => {
                    fill.style.width = `${width}%`;
                }, 400 + (index * 150));
            }
        });
    }

    animateCards(slide) {
        // Animate issue cards with stagger
        const issueCards = slide.querySelectorAll('.issue-card');
        issueCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Animate matrix items
        const matrixItems = slide.querySelectorAll('.matrix-item');
        matrixItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.3)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 600 + (index * 150));
        });
    }
}

// Enhanced animations and interactions
class AnimationController {
    constructor() {
        this.setupIntersectionObserver();
        this.setupHoverEffects();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);

        // Observe elements that should animate on scroll/visibility
        const animatedElements = document.querySelectorAll([
            '.agenda-item',
            '.context-card',
            '.issue-card',
            '.action-item',
            '.strategic-section',
            '.summary-item'
        ].join(','));

        animatedElements.forEach(el => observer.observe(el));
    }

    setupHoverEffects() {
        // Add enhanced hover effects to interactive elements
        const interactiveElements = document.querySelectorAll([
            '.agenda-item',
            '.context-card',
            '.matrix-item',
            '.nav-btn'
        ].join(','));

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.02)';
            });

            el.addEventListener('mouseleave', (e) => {
                e.target.style.transform = '';
            });
        });
    }
}

// Utility functions
const utils = {
    // Smooth scroll to element
    scrollToElement(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },

    // Format numbers with animation
    animateNumber(element, start, end, duration = 1000) {
        const startTimestamp = performance.now();
        
        const step = (timestamp) => {
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    },

    // Debounce function for performance
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
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main presentation controller
    window.presentationController = new PresentationController();
    
    // Initialize animation controller
    window.animationController = new AnimationController();
    
    // Setup additional interactive features
    setupTooltips();
    setupKeyboardShortcuts();
    setupPerformanceOptimizations();
});

// Tooltip system
function setupTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        let tooltip = null;
        
        element.addEventListener('mouseenter', (e) => {
            const text = e.target.dataset.tooltip;
            if (!text) return;
            
            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = text;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--color-charcoal-800);
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.2s ease;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - 35}px`;
            tooltip.style.transform = 'translateX(-50%)';
            
            // Show tooltip
            requestAnimationFrame(() => {
                tooltip.style.opacity = '1';
            });
        });
        
        element.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (tooltip && tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 200);
            }
        });
    });
}

// Keyboard shortcuts help
function setupKeyboardShortcuts() {
    let helpVisible = false;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === '?' || (e.key === 'h' && e.ctrlKey)) {
            e.preventDefault();
            toggleKeyboardHelp();
        } else if (e.key === 'Escape' && helpVisible) {
            e.preventDefault();
            hideKeyboardHelp();
        }
    });
    
    function toggleKeyboardHelp() {
        if (helpVisible) {
            hideKeyboardHelp();
        } else {
            showKeyboardHelp();
        }
    }
    
    function showKeyboardHelp() {
        if (helpVisible) return;
        
        const help = document.createElement('div');
        help.id = 'keyboard-help';
        help.className = 'keyboard-help-modal';
        help.innerHTML = `
            <div class="help-content">
                <h3>Raccourcis Clavier</h3>
                <div class="shortcuts">
                    <div class="shortcut">
                        <span class="key">→ ou Espace</span>
                        <span>Slide suivant</span>
                    </div>
                    <div class="shortcut">
                        <span class="key">←</span>
                        <span>Slide précédent</span>
                    </div>
                    <div class="shortcut">
                        <span class="key">Home</span>
                        <span>Premier slide</span>
                    </div>
                    <div class="shortcut">
                        <span class="key">End</span>
                        <span>Dernier slide</span>
                    </div>
                    <div class="shortcut">
                        <span class="key">F ou F11</span>
                        <span>Plein écran</span>
                    </div>
                    <div class="shortcut">
                        <span class="key">? ou Ctrl+H</span>
                        <span>Cette aide</span>
                    </div>
                    <div class="shortcut">
                        <span class="key">Echap</span>
                        <span>Fermer l'aide</span>
                    </div>
                </div>
                <p class="help-footer">Appuyez sur Echap pour fermer</p>
            </div>
        `;
        
        help.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        help.querySelector('.help-content').style.cssText = `
            background: var(--color-surface);
            padding: 32px;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            box-shadow: var(--shadow-lg);
        `;
        
        help.querySelectorAll('.shortcut').forEach(shortcut => {
            shortcut.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
                padding: 8px 0;
                border-bottom: 1px solid var(--color-border);
            `;
        });
        
        help.querySelectorAll('.key').forEach(key => {
            key.style.cssText = `
                background: var(--color-secondary);
                padding: 4px 8px;
                border-radius: 6px;
                font-family: var(--font-family-mono);
                font-size: 12px;
                font-weight: bold;
            `;
        });
        
        document.body.appendChild(help);
        helpVisible = true;
        
        requestAnimationFrame(() => {
            help.style.opacity = '1';
        });
        
        help.addEventListener('click', (e) => {
            if (e.target === help) {
                hideKeyboardHelp();
            }
        });
    }
    
    function hideKeyboardHelp() {
        const help = document.getElementById('keyboard-help');
        if (help) {
            help.style.opacity = '0';
            setTimeout(() => {
                if (help.parentNode) {
                    help.parentNode.removeChild(help);
                }
            }, 300);
        }
        helpVisible = false;
    }
}

// Performance optimizations
function setupPerformanceOptimizations() {
    // Lazy load animations
    const debouncedResize = utils.debounce(() => {
        // Recalculate positions on resize
        if (window.presentationController) {
            window.presentationController.triggerSlideAnimations();
        }
    }, 250);
    
    window.addEventListener('resize', debouncedResize);
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        const animations = document.querySelectorAll('*');
        animations.forEach(el => {
            if (document.hidden) {
                el.style.animationPlayState = 'paused';
            } else {
                el.style.animationPlayState = 'running';
            }
        });
    });
    
    // Preload next slide content for better performance
    const preloadSlideContent = (slideNumber) => {
        const slide = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
        if (slide) {
            const images = slide.querySelectorAll('img');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    };
    
    // Preload adjacent slides
    setInterval(() => {
        if (window.presentationController) {
            const current = window.presentationController.currentSlide;
            preloadSlideContent(current + 1);
            preloadSlideContent(current - 1);
        }
    }, 1000);
}

// Export for external use
window.PresentationUtils = {
    goToSlide: (slideNumber) => {
        if (window.presentationController) {
            window.presentationController.goToSlide(slideNumber);
        }
    },
    nextSlide: () => {
        if (window.presentationController) {
            window.presentationController.nextSlide();
        }
    },
    previousSlide: () => {
        if (window.presentationController) {
            window.presentationController.previousSlide();
        }
    },
    toggleFullscreen: () => {
        if (window.presentationController) {
            window.presentationController.toggleFullscreen();
        }
    }
};