// Mobile-specific optimizations
document.addEventListener('DOMContentLoaded', () => {
  // Only run on mobile devices
  if (window.innerWidth >= 768) return;
  
  // Optimize scroll performance
  let scrollTimeout;
  let isScrolling = false;
  
  // Function to temporarily disable animations during scroll
  const optimizeForScroll = () => {
    if (!isScrolling) {
      isScrolling = true;
      document.body.classList.add('scrolling');
      
      // Hide non-essential elements during scroll
      const rainbowBgs = document.querySelectorAll('.rainbow-bg');
      rainbowBgs.forEach(bg => {
        bg.style.opacity = '0.2'; // Reduce opacity during scroll
      });
    }
    
    // Clear the timeout
    clearTimeout(scrollTimeout);
    
    // Set a timeout to run after scrolling ends
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      document.body.classList.remove('scrolling');
      
      // Restore elements after scroll
      const rainbowBgs = document.querySelectorAll('.rainbow-bg');
      rainbowBgs.forEach(bg => {
        bg.style.opacity = '0.5'; // Restore opacity after scroll
      });
    }, 200);
  };
  
  // Add scroll event listener with passive option for better performance
  window.addEventListener('scroll', optimizeForScroll, { passive: true });
  
  // Add a class to body for mobile-specific CSS
  document.body.classList.add('mobile-device');
  
  // Disable animations for elements outside viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.classList.contains('rainbow-box')) {
        const rainbowBg = entry.target.querySelector('.rainbow-bg');
        if (rainbowBg) {
          if (entry.isIntersecting) {
            rainbowBg.style.animationPlayState = 'running';
          } else {
            rainbowBg.style.animationPlayState = 'paused';
          }
        }
      }
    });
  }, { rootMargin: '100px' });
  
  // Observe all rainbow boxes
  document.querySelectorAll('.rainbow-box').forEach(box => {
    observer.observe(box);
  });
});