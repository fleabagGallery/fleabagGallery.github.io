// Image caching and visibility management
document.addEventListener('DOMContentLoaded', () => {
  // Store original image sources
  const imageCache = new Map();
  const placeholder = './images/placeholder.svg';
  
  // Get all rainbow boxes
  const boxes = document.querySelectorAll('.rainbow-box');
  
  // Create IntersectionObserver for box visibility
  const boxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const box = entry.target;
      const images = box.querySelectorAll('img');
      
      if (entry.isIntersecting) {
        // Box is visible, restore images
        images.forEach(img => {
          if (imageCache.has(img)) {
            img.src = imageCache.get(img);
          }
        });
        box.style.visibility = 'visible';
      } else if (Math.abs(entry.boundingClientRect.y) > window.innerHeight) {
        // Box is far from viewport, cache images and use placeholder
        images.forEach(img => {
          if (!imageCache.has(img)) {
            imageCache.set(img, img.src);
          }
          img.src = placeholder;
        });
        box.style.visibility = 'hidden';
      }
    });
  }, {
    rootMargin: '100px',
    threshold: 0.01
  });
  
  // Observe all boxes
  boxes.forEach(box => {
    boxObserver.observe(box);
  });
});