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
        });
    } else {
        console.error('Sidebar toggle button not found!');
    }

    // Close sidebar when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!sidebarToggle) return; // Guard clause
        
        const isClickInsideSidebar = navbar.contains(event.target);
        const isClickOnToggle = sidebarToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnToggle && navbar.classList.contains('open')) {
            navbar.classList.remove('open');
            sidebarToggle.classList.remove('open');
            mainContent.classList.remove('sidebar-open');
        }
    });

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

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.amenity-card, .gallery-item, .contact-form');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
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