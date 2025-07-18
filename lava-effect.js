// Add fluid rainbow effect with optimized animation speeds
document.addEventListener('DOMContentLoaded', () => {
  // Detect if we're on mobile
  const isMobile = window.innerWidth < 768;
  
  // Use requestIdleCallback or setTimeout to defer non-critical work
  const optimizeRainbows = () => {
    // Find all rainbow backgrounds
    const rainbowBgs = document.querySelectorAll('.rainbow-bg');
    
    // Use a small set of predefined durations to improve browser optimization
    // Much longer durations on mobile
    const durations = isMobile ? [30, 40] : [15, 18, 20];
    
    rainbowBgs.forEach((rainbowEl, index) => {
      // Use modulo to cycle through predefined durations
      const duration = durations[index % durations.length];
      rainbowEl.style.animationDuration = `${duration}s`;
      
      if (!isMobile) {
        // Stagger animation delays to prevent simultaneous animations
        rainbowEl.style.animationDelay = `${(index % 5) * -2}s`;
      } else {
        // On mobile, use longer delays
        rainbowEl.style.animationDelay = `${(index % 2) * -5}s`;
      }
    });
  };
  
  // On mobile, delay this even further to prioritize content rendering
  const delay = isMobile ? 1000 : 100;
  
  // Use requestIdleCallback if available, otherwise setTimeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(optimizeRainbows);
  } else {
    setTimeout(optimizeRainbows, delay);
  }
});