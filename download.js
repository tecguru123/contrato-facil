
// Language detection and management (same as main script)
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
function goToIndex() {
    window.location.href = 'index.html';
}

// Download functionality
function handleDownloadAPK() {
    // Simulate APK download
    const link = document.createElement('a');
    link.href = '#'; // Here you would put the real APK link
    link.download = 'contrato-facil.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Scroll to instructions after starting download
    setTimeout(() => {
        const instructionsSection = document.getElementById('instructions-section');
        if (instructionsSection) {
            instructionsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 500);
    
    // Show informative alert
    const t = translations[currentLanguage];
    const alertMessage = `Download iniciado! ${t.instructions.steps[0]}`;
    alert(alertMessage);
}

// Scroll functionality
function scrollToContent() {
    const content = document.getElementById('download-content');
    if (content) {
        content.scrollIntoView({ behavior: 'smooth' });
        hideScrollIndicator();
    }
}

function hideScrollIndicator() {
    const indicator = document.getElementById('scrollIndicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

// Handle scroll indicator visibility
function handleScrollIndicator() {
    const indicator = document.getElementById('scrollIndicator');
    if (!indicator) return;
    
    const handleScroll = () => {
        const scrolled = window.scrollY > 100;
        indicator.style.display = scrolled ? 'none' : 'block';
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
}

// Initialize the download page
function initializeDownloadPage() {
    // Detect and set language
    currentLanguage = detectLanguage();
    document.documentElement.lang = currentLanguage;
    
    // Apply translations
    applyTranslations(currentLanguage);
    
    // Setup scroll indicator
    handleScrollIndicator();
    
    console.log(`Download page initialized with language: ${currentLanguage}`);
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDownloadPage);

// Export functions for global access
window.goToIndex = goToIndex;
window.handleDownloadAPK = handleDownloadAPK;
window.scrollToContent = scrollToContent;
window.currentLanguage = currentLanguage;
