// Language Switcher
function toggleLanguage() {
    const html = document.documentElement;
    const currentLang = html.getAttribute('lang');
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    
    html.setAttribute('lang', newLang);
    html.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${newLang}`);
    });
}

// Store language preference
function saveLanguagePreference(lang) {
    localStorage.setItem('preferred-language', lang);
}

function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
        const html = document.documentElement;
        html.setAttribute('lang', savedLang);
        html.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
        
        document.querySelectorAll('[data-ar][data-en]').forEach(element => {
            element.textContent = element.getAttribute(`data-${savedLang}`);
        });
    }
}

// Load saved language preference on page load
document.addEventListener('DOMContentLoaded', loadLanguagePreference);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll event listener for header
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add click event listeners for CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = document.documentElement.getAttribute('lang');
        const message = lang === 'ar' ? 'شكراً لاهتمامك! سنتواصل معك قريباً.' : 'Thank you for your interest! We will contact you soon.';
        alert(message);
    });
});

// Add animation on scroll for feature cards
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Countdown Timer
function updateCountdown() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7); // Set end date to 7 days from now

    function update() {
        const now = new Date();
        const diff = endDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (diff < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-container').style.display = 'none';
        }
    }

    update();
    const countdownInterval = setInterval(update, 1000);
}

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

// Contact Form
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to your server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    const lang = document.documentElement.getAttribute('lang');
    const successMessage = lang === 'ar' ? 
        'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 
        'Your message has been sent successfully! We will contact you soon.';
    
    alert(successMessage);
    
    // Reset form
    this.reset();
});

// Initialize countdown when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    loadLanguagePreference();
}); 