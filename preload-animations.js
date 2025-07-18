// Preload animations before they're needed
(() => {
  // Create a hidden container for preloading
  const preloadContainer = document.createElement('div');
  preloadContainer.style.position = 'absolute';
  preloadContainer.style.width = '1px';
  preloadContainer.style.height = '1px';
  preloadContainer.style.overflow = 'hidden';
  preloadContainer.style.opacity = '0.01';
  preloadContainer.style.pointerEvents = 'none';
  
  // Preload rainbow gradient animation
  const rainbowPreload = document.createElement('div');
  rainbowPreload.className = 'rainbow-bg';
  rainbowPreload.style.position = 'absolute';
  rainbowPreload.style.width = '100px';
  rainbowPreload.style.height = '100px';
  
  // Add to preload container
  preloadContainer.appendChild(rainbowPreload);
  
  // Add to document when DOM is ready
  if (document.body) {
    document.body.appendChild(preloadContainer);
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(preloadContainer);
    });
  }
})();