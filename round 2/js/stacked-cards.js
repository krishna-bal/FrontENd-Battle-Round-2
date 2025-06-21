// 3D Flip Cards Animation - Inspired by eduardbodak.com

// Enhanced Program Cards Animation System
class ProgramCardsAnimator {
    constructor() {
        this.programsSection = document.querySelector('.programs-section');
        this.cards = document.querySelectorAll('.program-card-flip');
        this.isAnimating = false;
        this.init();
    }
    
    init() {
        if (!this.programsSection || this.cards.length === 0) {
            console.log('Flip cards elements not found');
            return;
        }
        
        console.log('3D Flip cards animation initialized');
        console.log('Found cards:', this.cards.length);
        
        // Add intersection observer for scroll reveal
        this.setupIntersectionObserver();
        
        // Add card interactions
        this.setupCardInteractions();
        
        // Add staggered animations
        this.setupStaggeredAnimations();
        
        // Add performance optimizations
        this.setupPerformanceOptimizations();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger the animation based on card index
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.classList.add('card-visible');
                    }, index * 150);
                }
            });
        }, options);
        
        this.cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(card);
        });
    }
    
    setupCardInteractions() {
        this.cards.forEach(card => {
            // Add magnetic effect
            card.addEventListener('mousemove', (e) => this.handleMagneticEffect(e, card));
            card.addEventListener('mouseleave', (e) => this.resetMagneticEffect(e, card));
            
            // Add click effect
            card.addEventListener('click', (e) => this.handleCardClick(e, card));
            
            // Add hover sound effect (optional)
            card.addEventListener('mouseenter', () => this.playHoverSound());
        });
    }
    
    handleMagneticEffect(e, card) {
        if (this.isAnimating) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const maxTilt = 8;
        const tiltX = (y / rect.height) * maxTilt;
        const tiltY = -(x / rect.width) * maxTilt;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${tiltX}deg) 
            rotateY(${tiltY}deg) 
            translateZ(10px)
        `;
        
        // Add subtle glow effect
        const intensity = Math.sqrt(x * x + y * y) / (rect.width / 2);
        card.style.setProperty('--glow-intensity', Math.min(intensity * 0.3, 0.3));
    }
    
    resetMagneticEffect(e, card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        card.style.setProperty('--glow-intensity', '0');
    }
    
    handleCardClick(e, card) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Add ripple effect
        this.createRippleEffect(e, card);
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
            this.isAnimating = false;
        }, 150);
        
        // Trigger flip animation
        const inner = card.querySelector('.program-card-flip-inner');
        if (inner) {
            inner.style.transform = inner.style.transform.includes('rotateY(180deg)') 
                ? 'rotateY(0deg)' 
                : 'rotateY(180deg)';
        }
    }
    
    createRippleEffect(e, card) {
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    setupStaggeredAnimations() {
        // Add staggered entrance animations
        this.cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Add floating animation with different phases
            const floatDelay = index * 0.5;
            card.style.setProperty('--float-delay', `${floatDelay}s`);
        });
    }
    
    setupPerformanceOptimizations() {
        // Use requestAnimationFrame for smooth animations
        let ticking = false;
        
        const updateAnimations = () => {
            this.cards.forEach(card => {
                if (card.classList.contains('card-visible')) {
                    // Add subtle breathing effect
                    const time = Date.now() * 0.001;
                    const floatDelay = parseFloat(card.style.getPropertyValue('--float-delay') || '0');
                    const breathing = Math.sin(time + floatDelay) * 0.5;
                    
                    card.style.setProperty('--breathing-offset', `${breathing}px`);
                }
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        };
        
        // Only run animations when cards are visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestTick();
                }
            });
        }, { threshold: 0.1 });
        
        this.cards.forEach(card => observer.observe(card));
    }
    
    playHoverSound() {
        // Optional: Add subtle hover sound effect
        // This can be implemented with Web Audio API for a more immersive experience
        console.log('Hover sound effect triggered');
    }
}

// Enhanced CSS animations
const addEnhancedStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes cardEntrance {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes breathing {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(var(--breathing-offset, 0px)); }
        }
        
        .program-card-flip {
            --glow-intensity: 0;
            --breathing-offset: 0px;
        }
        
        .program-card-flip.card-visible {
            animation: breathing 4s ease-in-out infinite;
        }
        
        .program-card-flip::before {
            opacity: var(--glow-intensity);
        }
        
        .program-card-flip:hover {
            animation-play-state: paused;
        }
        
        /* Enhanced hover effects */
        .program-card-flip:hover .program-card-front-visual-icon {
            animation: iconPulse 0.6s ease-in-out;
        }
        
        @keyframes iconPulse {
            0%, 100% { transform: scale(1.2) rotate(8deg); }
            50% { transform: scale(1.3) rotate(12deg); }
        }
        
        /* Smooth transitions for all interactive elements */
        .program-card-flip * {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Performance optimizations */
        .program-card-flip {
            will-change: transform;
            backface-visibility: hidden;
        }
        
        /* Enhanced focus states for accessibility */
        .program-card-flip:focus {
            outline: 2px solid #6366f1;
            outline-offset: 2px;
        }
        
        /* Loading state */
        .program-card-flip.loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        /* Success state */
        .program-card-flip.success {
            animation: successPulse 0.6s ease-in-out;
        }
        
        @keyframes successPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addEnhancedStyles();
    new ProgramCardsAnimator();
    
    // Add loading states
    const cards = document.querySelectorAll('.program-card-flip');
    cards.forEach(card => {
        card.classList.add('loading');
        setTimeout(() => {
            card.classList.remove('loading');
        }, Math.random() * 1000 + 500);
    });
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProgramCardsAnimator;
} 