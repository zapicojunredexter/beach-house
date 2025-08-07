// Video Management with Placeholder Background
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.getElementById('hero-video');
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    // Video loading handler
    if (heroVideo) {
        heroVideo.addEventListener('error', function() {
            console.log('Video failed to load, showing placeholder background');
            // Show placeholder only if video fails
            if (videoPlaceholder) {
                videoPlaceholder.classList.add('show');
            }
        });
        
        // Preload video
        heroVideo.load();
    }

    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const navbar = document.querySelector('.navbar');
    const mainContent = document.querySelector('main');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    // Debug logging
    console.log('Sidebar Toggle Button:', sidebarToggle);
    console.log('Navbar:', navbar);
    console.log('Main Content:', mainContent);

    // Toggle sidebar visibility
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Toggle button clicked!');
            navbar.classList.toggle('open');
            sidebarToggle.classList.toggle('open');
            mainContent.classList.toggle('sidebar-open');
            
            // Adjust booking widget position when sidebar opens/closes
            const bookingWidget = document.getElementById('sticky-booking-widget');
            if (bookingWidget) {
                bookingWidget.classList.toggle('sidebar-adjusted');
            }
        });
    } else {
        console.error('Sidebar toggle button not found!');
    }

    // Close sidebar when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!sidebarToggle) return; // Guard clause
        
        const isClickInsideSidebar = navbar.contains(event.target);
        const isClickOnToggle = sidebarToggle.contains(event.target);
        const bookingWidget = document.getElementById('sticky-booking-widget');
        const isClickOnBookingWidget = bookingWidget && bookingWidget.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnToggle && !isClickOnBookingWidget && navbar.classList.contains('open')) {
            navbar.classList.remove('open');
            sidebarToggle.classList.remove('open');
            mainContent.classList.remove('sidebar-open');
            if (bookingWidget) {
                bookingWidget.classList.remove('sidebar-adjusted');
            }
        }
    });

    // Sticky Booking Widget Logic
    const bookingWidget = document.getElementById('sticky-booking-widget');
    const bookingWidgetClose = document.getElementById('booking-widget-close');
    let bookingWidgetDismissed = false;

    // Show/hide booking widget based on scroll position
    function updateBookingWidgetVisibility() {
        if (!bookingWidget || bookingWidgetDismissed) return;
        
        const scrollPosition = window.pageYOffset;
        const heroHeight = window.innerHeight;
        
        // Show widget after scrolling past hero section (reduced threshold)
        if (scrollPosition > heroHeight * 0.3) {
            bookingWidget.classList.add('visible');
        } else {
            bookingWidget.classList.remove('visible');
        }
    }
    
    // Initial call to show widget if already scrolled
    updateBookingWidgetVisibility();

    // Close booking widget
    if (bookingWidgetClose) {
        bookingWidgetClose.addEventListener('click', function() {
            bookingWidget.classList.remove('visible');
            bookingWidgetDismissed = true;
        });
    }

    // Add scroll listener for booking widget
    window.addEventListener('scroll', updateBookingWidgetVisibility);

    // Smooth scroll to contact section when booking button is clicked
    const bookingBtn = bookingWidget?.querySelector('.booking-btn.primary');
    if (bookingBtn) {
        bookingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking on a navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // On mobile, close hamburger menu
            if (hamburger) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            }
            // On desktop, optionally close sidebar (uncomment next lines if desired)
            // navbar.classList.remove('open');
            // sidebarToggle.classList.remove('open');
            // mainContent.classList.remove('sidebar-open');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Immediately update active state
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                const offsetTop = target.offsetTop; // No top navbar offset needed
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });



    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        
        // Simple validation
        if (!name || !email) {
            alert('Please fill in your name and email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // Gallery image hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageName = this.querySelector('.image-placeholder').textContent;
            alert(`Opening ${imageName} in full size...`);
        });
    });

    // Enhanced Scroll Animations
    const enhancedObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const enhancedObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animation to improve performance
                enhancedObserver.unobserve(entry.target);
            }
        });
    }, enhancedObserverOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(element => {
        enhancedObserver.observe(element);
    });

    // Legacy animation support for existing elements
    const legacyElements = document.querySelectorAll('.amenity-card:not([class*="scale-in"]), .gallery-item:not([class*="fade-in"]), .contact-form:not([class*="slide-in"])');
    legacyElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        const legacyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    legacyObserver.unobserve(entry.target);
                }
            });
        }, enhancedObserverOptions);
        
        legacyObserver.observe(el);
    });

    // Enhanced Parallax effect for video background
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        const videoBackground = document.querySelector('.video-background');
        const heroContent = document.querySelector('.hero-content');
        const navbar = document.querySelector('.navbar');
        
        // Video parallax effect
        if (videoBackground && scrolled < window.innerHeight) {
            videoBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        // Content fade effect with romantic elements
        if (heroContent && scrolled < window.innerHeight) {
            const opacity = 1 - (scrolled / window.innerHeight);
            const translateY = scrolled * 0.3;
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${translateY}px)`;
            
            // Romantic elements parallax
            const romanticElements = document.querySelector('.romantic-elements');
            if (romanticElements) {
                const romanticRate = scrolled * 0.2;
                romanticElements.style.transform = `translateY(${romanticRate}px) rotate(${scrolled * 0.05}deg)`;
            }
        }
        
        // Navbar is now a fixed sidebar, no need for scroll-based background changes
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);

    // Scroll Spy for active navigation
    const sections = document.querySelectorAll('section[id]');
    let previousSection = '';
    let sidebarAutoOpened = false;
    
    function updateActiveNavigation() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for better UX
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Auto-open sidebar when scrolling from home to about
        if (previousSection === 'home' && currentSection === 'about' && !sidebarAutoOpened) {
            if (sidebarToggle && !navbar.classList.contains('open')) {
                navbar.classList.add('open');
                sidebarToggle.classList.add('open');
                mainContent.classList.add('sidebar-open');
                
                // Adjust booking widget position when sidebar opens
                const bookingWidget = document.getElementById('sticky-booking-widget');
                if (bookingWidget) {
                    bookingWidget.classList.add('sidebar-adjusted');
                }
                
                sidebarAutoOpened = true;
                console.log('Auto-opened sidebar when scrolling from home to about');
            }
        }
        
        // Reset auto-open flag when back to home
        if (currentSection === 'home') {
            sidebarAutoOpened = false;
        }
        
        // Update navigation active states
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1); // Remove # from href
            if (href === currentSection) {
                link.classList.add('active');
            }
        });
        
        // Set home as active if at the very top
        if (window.pageYOffset < 50) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-menu a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
        
        // Update previous section
        previousSection = currentSection;
    }
    
    // Initialize active state on page load
    updateActiveNavigation();
    
    // Set home as active by default if no other section is active
    setTimeout(() => {
        const activeLink = document.querySelector('.nav-menu a.active');
        if (!activeLink) {
            const homeLink = document.querySelector('.nav-menu a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }, 100);
    
    // Update active state on scroll
    window.addEventListener('scroll', updateActiveNavigation);


});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add some CSS for animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;

document.head.appendChild(style);