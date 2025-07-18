// Scroll performance optimization
(() => {
  // Add passive event listeners for better scroll performance
  document.addEventListener('touchstart', () => {}, {passive: true});
  document.addEventListener('touchmove', () => {}, {passive: true});
  
  // Preload critical images
  const preloadImages = [
    './images/placeholder.svg'
  ];
  
  preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
})();