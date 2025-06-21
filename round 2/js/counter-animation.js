// Enhanced Counter Animation System
class CounterAnimator {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupCounterAnimations();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('animated');
                }
            });
        }, options);

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    setupCounterAnimations() {
        // Add staggered animation delays
        this.counters.forEach((counter, index) => {
            counter.style.animationDelay = `${index * 0.2}s`;
        });
    }

    animateCounter(counterElement) {
        const target = parseInt(counterElement.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counterElement.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.textContent = target;
                this.addCompletionEffect(counterElement);
            }
        };

        // Add entrance animation
        counterElement.style.opacity = '0';
        counterElement.style.transform = 'scale(0.5) translateY(20px)';
        
        setTimeout(() => {
            counterElement.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            counterElement.style.opacity = '1';
            counterElement.style.transform = 'scale(1) translateY(0)';
            updateCounter();
        }, 100);
    }

    addCompletionEffect(counterElement) {
        // Add completion animation
        counterElement.style.animation = 'counterComplete 0.5s ease-out';
        
        // Add sparkle effect
        this.createSparkleEffect(counterElement);
        
        // Add success sound (optional)
        this.playSuccessSound();
    }

    createSparkleEffect(counterElement) {
        const sparkles = 8;
        const rect = counterElement.getBoundingClientRect();
        
        for (let i = 0; i < sparkles; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #6366f1, #a855f7);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: sparkleAnim 1s ease-out forwards;
            `;
            
            const angle = (i / sparkles) * 2 * Math.PI;
            const distance = 30;
            const x = rect.left + rect.width / 2 + Math.cos(angle) * distance;
            const y = rect.top + rect.height / 2 + Math.sin(angle) * distance;
            
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            sparkle.style.animationDelay = `${i * 0.1}s`;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }

    playSuccessSound() {
        // Optional: Add subtle success sound
        console.log('Counter animation completed!');
    }
}

// Add CSS animations for counter effects
const addCounterStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes counterComplete {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes sparkleAnim {
            0% {
                opacity: 1;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
        
        .stat-number {
            transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .stat-number.animated {
            animation: numberGlow 2s ease-in-out infinite;
        }
        
        @keyframes numberGlow {
            0%, 100% { 
                filter: drop-shadow(0 0 5px rgba(99, 102, 241, 0.3));
            }
            50% { 
                filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.6));
            }
        }
        
        /* Enhanced hover effects for stat items */
        .stat-item {
            cursor: pointer;
        }
        
        .stat-item:hover .stat-number {
            animation: numberBounce 0.6s ease-in-out;
        }
        
        @keyframes numberBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        /* Loading state for counters */
        .stat-number:not(.animated) {
            opacity: 0.7;
        }
        
        /* Success state */
        .stat-number.completed {
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
    addCounterStyles();
    new CounterAnimator();
    
    // Add loading states
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counter.textContent = '0';
    });
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CounterAnimator;
} 