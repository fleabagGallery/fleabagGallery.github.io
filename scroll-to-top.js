// Force scroll to top on page load
(function() {
  // Execute immediately
  window.scrollTo(0, 0);
  
  // Also execute when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    
    // Set a flag to indicate we're starting from the top
    document.documentElement.style.setProperty('--start-from-top', 'true');
    
    // Preload first few images immediately
    const firstImages = Array.from(document.querySelectorAll('.rainbow-box img')).slice(0, 5);
    firstImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  });
})();