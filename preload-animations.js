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
  
  // Preload star animations
  const starPreload1 = document.createElement('div');
  starPreload1.className = 'star tiny';
  starPreload1.style.position = 'absolute';
  
  const starPreload2 = document.createElement('div');
  starPreload2.className = 'star small';
  starPreload2.style.position = 'absolute';
  
  const starPreload3 = document.createElement('div');
  starPreload3.className = 'star medium';
  starPreload3.style.position = 'absolute';
  
  // Add to preload container
  preloadContainer.appendChild(rainbowPreload);
  preloadContainer.appendChild(starPreload1);
  preloadContainer.appendChild(starPreload2);
  preloadContainer.appendChild(starPreload3);
  
  // Add to document when DOM is ready
  if (document.body) {
    document.body.appendChild(preloadContainer);
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(preloadContainer);
    });
  }
})();