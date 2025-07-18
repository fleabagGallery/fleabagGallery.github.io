// Add fluid rainbow effect with optimized animation speeds
document.addEventListener('DOMContentLoaded', () => {
  // Use requestIdleCallback or setTimeout to defer non-critical work
  const optimizeRainbows = () => {
    // Find all rainbow backgrounds
    const rainbowBgs = document.querySelectorAll('.rainbow-bg');
    
    // Use a small set of predefined durations to improve browser optimization
    const durations = [15, 18, 20];
    
    rainbowBgs.forEach((rainbowEl, index) => {
      // Use modulo to cycle through predefined durations
      const duration = durations[index % durations.length];
      rainbowEl.style.animationDuration = `${duration}s`;
      
      // Stagger animation delays to prevent simultaneous animations
      rainbowEl.style.animationDelay = `${(index % 5) * -2}s`;
    });
  };
  
  // Use requestIdleCallback if available, otherwise setTimeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(optimizeRainbows);
  } else {
    setTimeout(optimizeRainbows, 100);
  }
});