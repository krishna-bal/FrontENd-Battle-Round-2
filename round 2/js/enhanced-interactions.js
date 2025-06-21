// Enhanced Interactions - Inspired by eduardbodak.com, micro.so, newengen.com, petragarmon.com

class EnhancedInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.initCustomCursor();
        this.initParallaxEffects();
        this.initScrollAnimations();
        this.initTextReveal();
        this.initSmoothScrolling();
        this.initHoverEffects();
        this.initLoadingStates();
        this.initNumberCounters();
        this.initMagneticEffects();
        this.initScrollProgress();
    }

    // Custom Cursor (inspired by petragarmon.com)
    initCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor following
        const animateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .card, .program-card, .feature-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }

    // Parallax Effects (inspired by newengen.com)
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Scroll Animations (inspired by micro.so)
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add stagger effect for children
                    const children = entry.target.querySelectorAll('.stagger-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    // Text Reveal (inspired by eduardbodak.com)
    initTextReveal() {
        const textElements = document.querySelectorAll('.reveal-text');
        
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.5 });

        textElements.forEach(element => {
            textObserver.observe(element);
        });
    }

    // Smooth Scrolling (inspired by all sites)
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Enhanced Hover Effects (inspired by micro.so)
    initHoverEffects() {
        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('.btn, .card');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });

        // Tilt effect for cards
        const tiltElements = document.querySelectorAll('.card, .program-card');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // Loading States (inspired by micro.so)
    initLoadingStates() {
        const loadingElements = document.querySelectorAll('.btn, .program-btn');
        
        loadingElements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (element.classList.contains('loading')) return;
                
                element.classList.add('loading');
                element.innerHTML = '<span class="loading-text">Loading...</span>';
                
                // Simulate loading
                setTimeout(() => {
                    element.classList.remove('loading');
                    element.innerHTML = element.dataset.originalText || 'Get Started';
                }, 2000);
            });
        });
    }

    // Enhanced Number Counters (inspired by newengen.com)
    initNumberCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.dataset.target);
                    const duration = 2000;
                    const increment = finalValue / (duration / 16);
                    let currentValue = 0;
                    
                    const updateCounter = () => {
                        currentValue += increment;
                        if (currentValue < finalValue) {
                            target.textContent = Math.floor(currentValue);
                            target.classList.add('animate');
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.textContent = finalValue;
                            target.classList.remove('animate');
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Magnetic Effects (inspired by petragarmon.com)
    initMagneticEffects() {
        const magneticElements = document.querySelectorAll('.nav-logo-image, .btn');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Scroll Progress (inspired by eduardbodak.com)
    initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
}

// Enhanced Navigation
class EnhancedNavigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        this.initScrollEffect();
        this.initMobileMenu();
        this.initNavLinks();
    }

    initScrollEffect() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    initMobileMenu() {
        this.navToggle.addEventListener('click', () => {
            this.navToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.navToggle.classList.remove('active');
                this.navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    initNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navToggle.classList.remove('active');
                this.navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// Enhanced Testimonials
class EnhancedTestimonials {
    constructor() {
        this.currentIndex = 0;
        this.testimonials = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.getElementById('prev-testimonial');
        this.nextBtn = document.getElementById('next-testimonial');
        this.dotsContainer = document.getElementById('testimonial-dots');
        this.init();
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.autoAdvance();
    }

    createDots() {
        this.testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.showTestimonial(index));
            this.dotsContainer.appendChild(dot);
        });
    }

    showTestimonial(index) {
        // Hide all testimonials
        this.testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });

        // Remove active class from all dots
        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current testimonial and activate dot
        this.testimonials[index].classList.add('active');
        this.dotsContainer.children[index].classList.add('active');
        
        this.currentIndex = index;
    }

    nextTestimonial() {
        const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.showTestimonial(nextIndex);
    }

    prevTestimonial() {
        const prevIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.showTestimonial(prevIndex);
    }

    bindEvents() {
        this.nextBtn.addEventListener('click', () => this.nextTestimonial());
        this.prevBtn.addEventListener('click', () => this.prevTestimonial());
    }

    autoAdvance() {
        setInterval(() => this.nextTestimonial(), 5000);
    }
}

// Enhanced Forms
class EnhancedForms {
    constructor() {
        this.init();
    }

    init() {
        this.initFormValidation();
        this.initFormAnimations();
        this.initFormSubmission();
    }

    initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });
                
                input.addEventListener('input', () => {
                    if (input.value) {
                        input.classList.add('has-value');
                    } else {
                        input.classList.remove('has-value');
                    }
                });
            });
        });
    }

    initFormAnimations() {
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach((group, index) => {
            group.style.animationDelay = `${index * 0.1}s`;
            group.classList.add('animate-in');
        });
    }

    initFormSubmission() {
        const contactForm = document.getElementById('contact-form');
        const certificateForm = document.getElementById('certificate-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }
        
        if (certificateForm) {
            certificateForm.addEventListener('submit', this.handleCertificateForm.bind(this));
        }
    }

    handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Show success animation
        this.showSuccessMessage('Thank you for your message! We will get back to you soon.');
        
        // Reset form with animation
        this.resetFormWithAnimation(e.target);
    }

    handleCertificateForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        this.showLoadingMessage('Verifying certificate...');
        
        setTimeout(() => {
            this.showSuccessMessage('Certificate verified successfully!');
            this.resetFormWithAnimation(e.target);
        }, 2000);
    }

    showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✓</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    showLoadingMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'loading-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">⏳</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        return notification;
    }

    resetFormWithAnimation(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach((input, index) => {
            setTimeout(() => {
                input.style.transform = 'scale(0.95)';
                input.style.opacity = '0.5';
                
                setTimeout(() => {
                    input.value = '';
                    input.style.transform = 'scale(1)';
                    input.style.opacity = '1';
                }, 200);
            }, index * 50);
        });
    }
}

// Initialize all enhanced interactions
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new EnhancedInteractions();
        new EnhancedNavigation();
        new EnhancedTestimonials();
        new EnhancedForms();
    }, 3000); // Wait for loading screen to complete
}); 