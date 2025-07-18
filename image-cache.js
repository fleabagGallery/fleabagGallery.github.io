// Image caching and visibility management with optimized memory usage and scroll performance
document.addEventListener('DOMContentLoaded', () => {
  const placeholder = './images/placeholder.svg';
  const imageCache = new WeakMap();
  let isScrolling = false;
  let scrollTimeout;
  
  // Check if device is mobile
  const isMobile = window.innerWidth <= 768;
  
  // Simplified image loading for mobile
  if (isMobile) {
    // Force scroll to top on page load
    window.scrollTo(0, 0);
    
    // Only load visible images initially
    const loadVisibleImages = () => {
      const viewportHeight = window.innerHeight;
      // Get all boxes and sort by their vertical position (top to bottom)
      const boxes = Array.from(document.querySelectorAll('.rainbow-box'));
      boxes.sort((a, b) => {
        return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
      });
      
      // Process boxes in top-to-bottom order
      boxes.forEach(box => {
        const rect = box.getBoundingClientRect();
        const isVisible = rect.top < viewportHeight * 1.5 && rect.bottom > -viewportHeight * 0.5;
        
        if (isVisible) {
          const images = box.querySelectorAll('img');
          images.forEach(img => {
            if (img.dataset.src && !img.dataset.loading) {
              img.dataset.loading = 'true';
              img.src = img.dataset.src;
            }
          });
        }
      });
    };
    
    // Load visible images immediately
    loadVisibleImages();
    
    // Load more images when scrolling stops
    document.addEventListener('scroll', () => {
      if (!isScrolling) {
        isScrolling = true;
        document.body.classList.add('is-scrolling');
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.body.classList.remove('is-scrolling');
        loadVisibleImages();
      }, 100);
    }, { passive: true });
    
    return; // Skip the rest of the code for mobile
  }
  
  // Desktop code below
  // Preload images that will soon be visible
  const preloadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const box = entry.target;
        const images = box.querySelectorAll('img[data-src]');
        images.forEach(img => {
          // Start loading image but don't display yet
          const tempImg = new Image();
          tempImg.onload = () => {
            if (!isScrolling) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
          };
          tempImg.src = img.dataset.src;
        });
      }
    });
  }, {
    rootMargin: '400px', // Larger margin to preload earlier
    threshold: 0
  });
  
  // Main observer for visibility management
  const boxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const box = entry.target;
      
      if (entry.isIntersecting) {
        // Box is visible, restore images
        if (box.dataset.imagesHidden === 'true') {
          const images = box.querySelectorAll('img');
          images.forEach(img => {
            if (imageCache.has(img)) {
              // Use requestAnimationFrame to sync with browser's rendering cycle
              requestAnimationFrame(() => {
                img.src = imageCache.get(img);
              });
            }
          });
          box.style.visibility = 'visible';
          box.dataset.imagesHidden = 'false';
        }
      } else if (Math.abs(entry.boundingClientRect.y) > window.innerHeight * 1.5) {
        // Box is far from viewport, cache images and use placeholder
        if (box.dataset.imagesHidden !== 'true') {
          const images = box.querySelectorAll('img');
          images.forEach(img => {
            if (!imageCache.has(img) && img.src !== placeholder) {
              imageCache.set(img, img.src);
              img.src = placeholder;
            }
          });
          box.style.visibility = 'hidden';
          box.dataset.imagesHidden = 'true';
        }
      }
    });
  }, {
    rootMargin: '200px',
    threshold: 0.01
  });
  
  // Track scrolling state to optimize rendering
  document.addEventListener('scroll', () => {
    if (!isScrolling) {
      isScrolling = true;
      document.body.classList.add('is-scrolling');
    }
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      document.body.classList.remove('is-scrolling');
      
      // Process any pending image loads
      document.querySelectorAll('img[data-src]').forEach(img => {
        if (isElementInViewport(img.parentNode)) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      });
    }, 100);
  }, { passive: true });
  
  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  // Initialize observers
  requestIdleCallback(() => {
    document.querySelectorAll('.rainbow-box').forEach(box => {
      // Store original image sources in data-src
      const images = box.querySelectorAll('img');
      images.forEach(img => {
        if (!img.dataset.src) {
          img.dataset.src = img.src;
        }
      });
      
      box.dataset.imagesHidden = 'false';
      boxObserver.observe(box);
      preloadObserver.observe(box);
    });
  }, { timeout: 500 });
  
  // Disconnect observers when page is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      boxObserver.disconnect();
      preloadObserver.disconnect();
    } else {
      document.querySelectorAll('.rainbow-box').forEach(box => {
        boxObserver.observe(box);
        preloadObserver.observe(box);
      });
    }
  });
});