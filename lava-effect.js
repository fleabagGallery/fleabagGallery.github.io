// Add fluid rainbow effect with random animation speeds
document.addEventListener('DOMContentLoaded', () => {
  // Find all rainbow backgrounds
  const rainbowBgs = document.querySelectorAll('.rainbow-bg');
  
  rainbowBgs.forEach(rainbowEl => {
    // Random animation duration for each rainbow (10-20s)
    const duration = 10 + Math.floor(Math.random() * 10);
    rainbowEl.style.animationDuration = `${duration}s`;
    
    // Random animation delay
    rainbowEl.style.animationDelay = `${Math.random() * -10}s`;
  });
});