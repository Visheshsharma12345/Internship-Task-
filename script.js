document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize scroll progress bar with throttling
        const scrollProgress = document.querySelector('.scroll-progress');
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolled = (window.scrollY / windowHeight) * 100;
                    scrollProgress.style.width = `${scrolled}%`;
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Performance optimization: Use Intersection Observer for animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add appropriate animation class based on element type
                    if (entry.target.classList.contains('hero')) {
                        entry.target.classList.add('animate-fade-in');
                    } else if (entry.target.classList.contains('step-item')) {
                        entry.target.classList.add('animate-scale-in');
                    } else if (entry.target.classList.contains('feature-card')) {
                        entry.target.classList.add('animate-slide-left');
                    } else if (entry.target.classList.contains('testimonial-item')) {
                        entry.target.classList.add('animate-slide-right');
                    } else {
                        entry.target.classList.add('animate-fade-in');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Initialize animations for elements
        const animatedElements = document.querySelectorAll('.hero, .steps, .resale-forbidden, .trusted-verified, .massive-database, .direct-decision-make-access, .why-spend, .world-class-data, .integrating-tools, .struggling-clients, .data-sample, .testimonials, .faq-section, .disclaimer');
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            observer.observe(element);
        });

        // Add floating animation to specific elements
        document.querySelectorAll('.step-icon, .feature-icon').forEach(element => {
            element.classList.add('animate-float');
        });

        // Add pulse animation to CTA buttons
        document.querySelectorAll('.cta-button, .get-access-button').forEach(button => {
            button.classList.add('animate-pulse');
        });

        // Enhanced FAQ Toggle functionality with smooth animation
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqAnswer = question.nextElementSibling;
                const span = question.querySelector('span');
                
                // Close other open FAQs
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== question) {
                        const otherAnswer = otherQuestion.nextElementSibling;
                        const otherSpan = otherQuestion.querySelector('span');
                        otherAnswer.classList.remove('active');
                        otherSpan.textContent = '+';
                    }
                });

                // Toggle current FAQ with animation
                faqAnswer.classList.toggle('active');
                span.textContent = faqAnswer.classList.contains('active') ? '-' : '+';
                
                // Add slide animation
                if (faqAnswer.classList.contains('active')) {
                    faqAnswer.style.animation = 'slideInLeft 0.3s ease-out forwards';
                }
            });
        });

        // Enhanced smooth scroll with offset for fixed header
        const header = document.querySelector('header');
        let lastScroll = 0;
        let scrollTimeout;

        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scrolled');
                return;
            }
            
            if (currentScroll > lastScroll) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // Smooth Scroll for Navigation Links with debouncing
        const debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };

        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', debounce(function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100));
        });

        // Chat Button Functionality
        const chatButton = document.querySelector('.chat-button');
        chatButton.addEventListener('click', () => {
            // Replace with your chat integration
            window.open('https://wa.me/your-number', '_blank');
        });

        // Access Button Functionality with loading state
        const accessButton = document.querySelector('.access-button');
        const ctaButton = document.querySelector('.cta-button');

        function handleAccessClick() {
            // Add loading state
            this.classList.add('loading');
            
            // Simulate payment process
            setTimeout(() => {
                this.classList.remove('loading');
                // Replace with your payment integration
                alert('Redirecting to payment gateway...');
            }, 1000);
        }

        accessButton.addEventListener('click', handleAccessClick);
        ctaButton.addEventListener('click', handleAccessClick);

        // FAQ Toggle Functionality with performance optimization
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            const answer = item.querySelector('p');
            
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (!isOpen) {
                    item.classList.add('active');
                }
            });
        });

        // Animation on Scroll with throttling
        const throttle = (func, limit) => {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };

        const animateOnScroll = throttle(() => {
            const elements = document.querySelectorAll('.database-feature, .faq-item');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                
                if (elementTop < window.innerHeight && elementBottom > 0) {
                    element.classList.add('animate-fade-in');
                }
            });
        }, 100);

        // Initial check for elements in view
        animateOnScroll();

        // Add scroll event listener for animations
        window.addEventListener('scroll', animateOnScroll);

        // Error Handling with user-friendly messages
        window.addEventListener('error', function(e) {
            console.error('Global error caught:', e.error);
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Something went wrong. Please refresh the page.';
            document.body.appendChild(errorMessage);
            setTimeout(() => errorMessage.remove(), 5000);
        });

        // Initialize access buttons when DOM is loaded
        function initAccessButtons() {
            const accessButtons = document.querySelectorAll('.access-button, .get-access-button, .cta-button, .feature-button, .orange-button');
            
            accessButtons.forEach(button => {
                button.addEventListener('click', async function(e) {
                    e.preventDefault();
                    
                    if (this.classList.contains('loading')) return;
                    
                    try {
                        // Store original text and add loading state
                        const originalText = this.innerHTML;
                        this.classList.add('loading');
                        this.innerHTML = '<span class="spinner"></span> Processing...';
                        
                        // Show payment modal or redirect to payment
                        const paymentUrl = 'https://buy.stripe.com/your-payment-link'; // Replace with actual payment URL
                        
                        // Create and show payment modal
                        const modal = document.createElement('div');
                        modal.className = 'payment-modal';
                        modal.innerHTML = `
                            <div class="payment-modal-content">
                                <h3>Complete Your Purchase</h3>
                                <p>You're just one step away from accessing 400M+ verified B2B leads!</p>
                                <div class="payment-options">
                                    <button class="payment-option" data-amount="99">
                                        <span class="amount">$99</span>
                                        <span class="period">One-time payment</span>
                                        <span class="features">Lifetime access</span>
                                    </button>
                                </div>
                                <div class="payment-actions">
                                    <button class="proceed-payment">Proceed to Payment</button>
                                    <button class="cancel-payment">Cancel</button>
                                </div>
                            </div>
                        `;
                        
                        document.body.appendChild(modal);
                        
                        // Add modal styles
                        const style = document.createElement('style');
                        style.textContent = `
                            .payment-modal {
                                position: fixed;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background: rgba(0, 0, 0, 0.8);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                z-index: 1000;
                                opacity: 0;
                                animation: fadeIn 0.3s ease forwards;
                            }
                            
                            .payment-modal-content {
                                background: var(--background-light);
                                padding: 2rem;
                                border-radius: var(--border-radius);
                                max-width: 500px;
                                width: 90%;
                                text-align: center;
                            }
                            
                            .payment-options {
                                margin: 2rem 0;
                            }
                            
                            .payment-option {
                                background: var(--background-dark);
                                border: 2px solid var(--primary-color);
                                border-radius: var(--border-radius);
                                padding: 1rem;
                                width: 100%;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            }
                            
                            .payment-option:hover {
                                background: var(--primary-color);
                                color: white;
                            }
                            
                            .payment-actions {
                                display: flex;
                                gap: 1rem;
                                justify-content: center;
                            }
                            
                            .proceed-payment {
                                background: var(--primary-color);
                                color: white;
                                border: none;
                                padding: 1rem 2rem;
                                border-radius: var(--border-radius);
                                cursor: pointer;
                                transition: all 0.3s ease;
                            }
                            
                            .proceed-payment:hover {
                                background: var(--primary-hover);
                                transform: translateY(-2px);
                            }
                            
                            .cancel-payment {
                                background: transparent;
                                color: var(--text-color);
                                border: 1px solid var(--text-color);
                                padding: 1rem 2rem;
                                border-radius: var(--border-radius);
                                cursor: pointer;
                                transition: all 0.3s ease;
                            }
                            
                            .cancel-payment:hover {
                                background: rgba(255, 255, 255, 0.1);
                            }
                        `;
                        document.head.appendChild(style);
                        
                        // Handle payment modal interactions
                        const proceedButton = modal.querySelector('.proceed-payment');
                        const cancelButton = modal.querySelector('.cancel-payment');
                        
                        proceedButton.addEventListener('click', () => {
                            // Remove loading state from original button
                            this.classList.remove('loading');
                            this.innerHTML = originalText;
                            
                            // Remove modal
                            modal.remove();
                            style.remove();
                            
                            // Show success message
                            const successMessage = document.createElement('div');
                            successMessage.className = 'success-message';
                            successMessage.textContent = 'Redirecting to secure payment...';
                            document.body.appendChild(successMessage);
                            
                            // Redirect to payment page after a short delay
                            setTimeout(() => {
                                window.location.href = paymentUrl;
                            }, 1500);
                        });
                        
                        cancelButton.addEventListener('click', () => {
                            // Remove loading state from original button
                            this.classList.remove('loading');
                            this.innerHTML = originalText;
                            
                            // Remove modal
                            modal.remove();
                            style.remove();
                        });
                        
                    } catch (error) {
                        console.error('Error in payment process:', error);
                        
                        // Remove loading state
                        this.classList.remove('loading');
                        this.innerHTML = originalText;
                        
                        // Show error message
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'An error occurred. Please try again later.';
                        document.body.appendChild(errorMessage);
                        
                        // Remove error message after 5 seconds
                        setTimeout(() => {
                            errorMessage.remove();
                        }, 5000);
                    }
                });
            });
        }

        // Initialize access buttons when DOM is loaded
        initAccessButtons();

        // Initialize all button functionality
        function initButtonFunctionality() {
            // Chat buttons functionality
            document.querySelectorAll('.chat-button, .chat-now').forEach(button => {
                button.addEventListener('click', () => {
                    window.open('https://wa.me/918108972414', '_blank');
                });
            });

            // FAQ toggle buttons
            document.querySelectorAll('.faq-question').forEach(question => {
                question.addEventListener('click', () => {
                    const answer = question.nextElementSibling;
                    const span = question.querySelector('span');
                    
                    // Close other open FAQs
                    document.querySelectorAll('.faq-question').forEach(otherQuestion => {
                        if (otherQuestion !== question) {
                            const otherAnswer = otherQuestion.nextElementSibling;
                            const otherSpan = otherQuestion.querySelector('span');
                            otherAnswer.classList.remove('active');
                            otherSpan.textContent = '+';
                        }
                    });

                    // Toggle current FAQ
                    answer.classList.toggle('active');
                    span.textContent = answer.classList.contains('active') ? '-' : '+';
                });
            });

            // Cookie consent buttons
            const cookieAccept = document.querySelector('.cookie-accept');
            const cookieLearnMore = document.querySelector('.cookie-learn-more');
            
            if (cookieAccept) {
                cookieAccept.addEventListener('click', () => {
                    localStorage.setItem('cookieConsent', 'true');
                    const cookieBanner = document.querySelector('.cookie-banner');
                    if (cookieBanner) {
                        cookieBanner.classList.remove('visible');
                        setTimeout(() => cookieBanner.remove(), 300);
                    }
                });
            }

            if (cookieLearnMore) {
                cookieLearnMore.addEventListener('click', (e) => {
                    e.preventDefault();
                    const privacyPolicy = document.getElementById('privacy-policy');
                    if (privacyPolicy) {
                        privacyPolicy.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }

            // Terms navigation buttons
            document.querySelectorAll('.terms-nav a').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Back to top button
            const backToTop = document.querySelector('.terms-back-to-top');
            if (backToTop) {
                backToTop.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        }

        // Initialize button functionality when DOM is loaded
        initButtonFunctionality();

        // Initialize cookie consent with animation
        if (!localStorage.getItem('cookieConsent')) {
            const cookieBanner = document.createElement('div');
            cookieBanner.className = 'cookie-banner';
            cookieBanner.innerHTML = `
                <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                <div class="cookie-buttons">
                    <button class="cookie-accept">Accept</button>
                    <a href="#" class="cookie-learn-more">Learn More</a>
                </div>
            `;
            document.body.appendChild(cookieBanner);
            
            // Add animation class after a small delay
            setTimeout(() => {
                cookieBanner.classList.add('visible');
            }, 100);

            // Add event listeners for cookie banner
            cookieBanner.querySelector('.cookie-accept').addEventListener('click', () => {
                cookieBanner.classList.remove('visible');
                setTimeout(() => {
                    cookieBanner.remove();
                }, 300);
                localStorage.setItem('cookieConsent', 'true');
            });

            cookieBanner.querySelector('.cookie-learn-more').addEventListener('click', (e) => {
                e.preventDefault();
                // Implement your cookie policy page navigation here
            });
        }

        // Terms and Conditions Animations
        function initTermsAnimations() {
            const termsContent = document.querySelector('.terms-content');
            const termsNav = document.querySelector('.terms-nav');
            const backToTop = document.querySelector('.terms-back-to-top');
            const sections = document.querySelectorAll('.terms-content h3');
            
            // Add visible class to terms content when it's in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            if (termsContent) {
                observer.observe(termsContent);
            }

            // Handle navigation visibility
            window.addEventListener('scroll', () => {
                if (termsNav) {
                    const termsSection = document.querySelector('.terms-section');
                    if (termsSection) {
                        const rect = termsSection.getBoundingClientRect();
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            termsNav.classList.add('visible');
                        } else {
                            termsNav.classList.remove('visible');
                        }
                    }
                }

                // Handle back to top button
                if (backToTop) {
                    if (window.scrollY > 300) {
                        backToTop.classList.add('visible');
                    } else {
                        backToTop.classList.remove('visible');
                    }
                }

                // Update active section in navigation
                if (sections.length > 0) {
                    sections.forEach(section => {
                        const rect = section.getBoundingClientRect();
                        if (rect.top <= 100 && rect.bottom >= 100) {
                            const id = section.getAttribute('id');
                            const navLink = document.querySelector(`.terms-nav a[href="#${id}"]`);
                            if (navLink) {
                                document.querySelectorAll('.terms-nav a').forEach(link => {
                                    link.classList.remove('active');
                                });
                                navLink.classList.add('active');
                            }
                        }
                    });
                }
            });

            // Smooth scroll for navigation links
            const navLinks = document.querySelectorAll('.terms-nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Back to top functionality
            if (backToTop) {
                backToTop.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        }

        // Initialize terms animations when DOM is loaded
        initTermsAnimations();

        function initDatabaseContent() {
            const databaseSection = document.querySelector('.database-content');
            if (!databaseSection) return;

            // Initialize animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1
            });

            // Observe all animated elements
            document.querySelectorAll('.data-card, .feature, .data-sample').forEach(el => {
                observer.observe(el);
            });

            // Handle sample table hover effects
            const tableRows = document.querySelectorAll('.sample-table tr');
            tableRows.forEach(row => {
                row.addEventListener('mouseenter', () => {
                    row.style.backgroundColor = 'rgba(255, 102, 0, 0.1)';
                });
                row.addEventListener('mouseleave', () => {
                    row.style.backgroundColor = '';
                });
            });

            // Add smooth scroll for navigation links
            const navLinks = document.querySelectorAll('a[href^="#"]');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Add loading state to CTA button
            const ctaButton = document.querySelector('.cta-container .get-access-button');
            if (ctaButton) {
                ctaButton.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const originalText = ctaButton.textContent;
                    ctaButton.disabled = true;
                    ctaButton.innerHTML = '<span class="loading-spinner"></span> Processing...';

                    try {
                        // Simulate API call
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        
                        // Show success message
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.textContent = 'Redirecting to payment page...';
                        ctaButton.parentNode.insertBefore(successMessage, ctaButton.nextSibling);

                        // Redirect after a short delay
                        setTimeout(() => {
                            window.location.href = 'https://pay.kiwify.com.br/leadstarget';
                        }, 2000);
                    } catch (error) {
                        console.error('Error:', error);
                        ctaButton.textContent = originalText;
                        ctaButton.disabled = false;
                        
                        // Show error message
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'An error occurred. Please try again.';
                        ctaButton.parentNode.insertBefore(errorMessage, ctaButton.nextSibling);
                        
                        // Remove error message after 3 seconds
                        setTimeout(() => {
                            errorMessage.remove();
                        }, 3000);
                    }
                });
            }
        }

        // Initialize database content when DOM is loaded
        initDatabaseContent();

    } catch (error) {
        console.error('Error initializing website:', error);
        // Show user-friendly error message with animation
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = 'We\'re experiencing some technical difficulties. Please try refreshing the page.';
        document.body.appendChild(errorMessage);
        
        // Add animation class after a small delay
        setTimeout(() => {
            errorMessage.classList.add('visible');
        }, 100);
    }
}); 