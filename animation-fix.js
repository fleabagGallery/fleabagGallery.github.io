// Precompute animations for better performance
document.addEventListener('DOMContentLoaded', () => {
  // Detect if we're on a low-power device
  const isMobile = window.innerWidth < 768;
  
  // Precompute animation frames
  const precomputeAnimations = () => {
    // Get all rainbow backgrounds
    const rainbowBgs = document.querySelectorAll('.rainbow-bg');
    
    // Set different animation durations to stagger them
    rainbowBgs.forEach((bg, index) => {
      // Use longer durations for better performance
      const baseDuration = isMobile ? 25 : 20;
      const duration = baseDuration + (index % 5) * 2;
      bg.style.animationDuration = `${duration}s`;
      
      // Stagger animation start positions
      const delay = -(index % 5) * 4;
      bg.style.animationDelay = `${delay}s`;
    });
  };
  
  // Run precomputation
  precomputeAnimations();
  
  // Prevent color changes during scroll
  let scrollTimer;
  window.addEventListener('scroll', () => {
    // Add scrolling class without changing colors
    document.documentElement.classList.add('is-scrolling');
    
    // Clear previous timeout
    clearTimeout(scrollTimer);
    
    // Remove class after scrolling stops
    scrollTimer = setTimeout(() => {
      document.documentElement.classList.remove('is-scrolling');
    }, 100);
  }, { passive: true });
});