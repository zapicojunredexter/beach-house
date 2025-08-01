// Loading Screen and Video Management
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const heroVideo = document.getElementById('hero-video');
    const videoBackground = document.querySelector('.video-background');
    let videoLoaded = false;
    let minLoadingTime = 2000; // Minimum loading time for UX
    
    // Show loading screen initially
    loadingScreen.style.display = 'flex';
    
    // Video loading handler
    if (heroVideo) {
        heroVideo.addEventListener('loadeddata', function() {
            videoLoaded = true;
            checkLoadingComplete();
        });
        
        heroVideo.addEventListener('error', function() {
            console.log('Video failed to load, using fallback');
            const fallback = document.querySelector('.video-fallback');
            if (fallback) {
                fallback.style.display = 'block';
            }
            videoLoaded = true;
            checkLoadingComplete();
        });
        
        // Preload video
        heroVideo.load();
    } else {
        videoLoaded = true;
        checkLoadingComplete();
    }
    
    // Minimum loading time
    setTimeout(() => {
        minLoadingTime = 0;
        checkLoadingComplete();
    }, 2000);
    
    function checkLoadingComplete() {
        if (videoLoaded && minLoadingTime === 0) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
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
        
        // Navbar background on scroll
        if (scrolled > 50) {
            navbar.style.background = 'rgba(248, 242, 232, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(107, 165, 165, 0.25)';
        } else {
            navbar.style.background = 'rgba(248, 242, 232, 0.9)';
            navbar.style.boxShadow = '0 2px 20px rgba(107, 165, 165, 0.2)';
        }
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);

    // Romantic interaction effects
    const romanticIcons = document.querySelectorAll('.romantic-icon');
    romanticIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'romanticPulse 2.5s ease-in-out infinite';
            }, 100);
            
            // Create floating heart effect
            createFloatingHeart(this);
        });
    });
    
    function createFloatingHeart(element) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'absolute';
        heart.style.fontSize = '1.5rem';
        heart.style.color = '#ff9a56';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        const rect = element.getBoundingClientRect();
        heart.style.left = rect.left + 'px';
        heart.style.top = rect.top + 'px';
        
        document.body.appendChild(heart);
        
        // Animate floating heart
        heart.animate([
            { transform: 'translateY(0px) scale(1)', opacity: 1 },
            { transform: 'translateY(-100px) scale(1.5)', opacity: 0 }
        ], {
            duration: 2000,
            easing: 'ease-out'
        }).addEventListener('finish', () => {
            heart.remove();
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
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
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;

document.head.appendChild(style);