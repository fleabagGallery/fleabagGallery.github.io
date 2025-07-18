// Create and manage loading screen
(function() {
  // Function to hide loading screen
  function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
    
    if (document.body) {
      document.body.classList.remove('loading');
    }
    
    setTimeout(function() {
      if (loadingScreen && loadingScreen.parentNode) {
        loadingScreen.parentNode.removeChild(loadingScreen);
      }
    }, 500);
  }
  
  // Initialize loading screen when DOM is ready
  window.addEventListener('DOMContentLoaded', function() {
    // Replace placeholder or append to body
    const placeholder = document.getElementById('loading-screen-placeholder');
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.replaceChild(loadingScreen, placeholder);
    } else if (document.body) {
      document.body.appendChild(loadingScreen);
    }
    
    // Track high priority images
    const highPriorityImages = Array.from(document.querySelectorAll('img[fetchpriority="high"]'));
    let loadedCount = 0;
    
    // Check if images are loaded
    highPriorityImages.forEach(function(img) {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener('load', function() {
          loadedCount++;
          if (loadedCount >= highPriorityImages.length) {
            hideLoadingScreen();
          }
        });
        
        // Also handle error case
        img.addEventListener('error', function() {
          loadedCount++;
          if (loadedCount >= highPriorityImages.length) {
            hideLoadingScreen();
          }
        });
      }
    });
    
    // If all images were already loaded or there are no priority images
    if (loadedCount >= highPriorityImages.length || highPriorityImages.length === 0) {
      hideLoadingScreen();
    }
    
    // Fallback timeout (longer for more images)
    setTimeout(hideLoadingScreen, 4000);
  });
  
  // Also handle page load event as backup
  window.addEventListener('load', function() {
    hideLoadingScreen();
  });
})();