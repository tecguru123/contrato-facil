
// Language detection and management
let currentLanguage = 'pt';

// Detect browser language
function detectLanguage() {
    const browserLanguage = navigator.language || navigator.languages[0];
    const langCode = browserLanguage.split('-')[0].toLowerCase();
    
    const supportedLanguages = ['pt', 'es', 'fr', 'en'];
    return supportedLanguages.includes(langCode) ? langCode : 'pt';
}

// Apply translations to the page
function applyTranslations(language) {
    const t = translations[language];
    if (!t) return;
    
    // Find all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedValue(t, key);
        
        if (translation) {
            element.textContent = translation;
        }
    });
}

// Helper function to get nested object values
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : null;
    }, obj);
}

// Navigation functions
function goToDownload() {
    window.location.href = 'download.html';
}

function goToIndex() {
    window.location.href = 'index.html';
}

// Smooth scroll for anchor links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize the page
function initializePage() {
    // Detect and set language
    currentLanguage = detectLanguage();
    document.documentElement.lang = currentLanguage;
    
    // Apply translations
    applyTranslations(currentLanguage);
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    console.log(`Page initialized with language: ${currentLanguage}`);
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Export functions for global access
window.goToDownload = goToDownload;
window.goToIndex = goToIndex;
window.currentLanguage = currentLanguage;
