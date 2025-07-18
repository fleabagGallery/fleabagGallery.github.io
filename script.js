document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on mobile
  const isMobile = window.innerWidth < 768;
  
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    // Add staggered animation delay and random offsets to rainbow boxes
    document.querySelectorAll('.rainbow-box').forEach((box, index) => {
      // Limit animation delays to reduce simultaneous animations
      box.style.animationDelay = `${index % 5 * 0.2}s`;
      
      // Add random margin offsets for a more natural look
      const randomMarginTop = Math.floor(Math.random() * 15) - 5;
      const randomMarginLeft = Math.floor(Math.random() * 10) - 5;
      box.style.marginTop = `${randomMarginTop}px`;
      box.style.marginLeft = `${randomMarginLeft}px`;
      
      // Create a pseudo-element for the rainbow effect
      // Use a single rainbow effect for all boxes instead of individual ones
      if (!box.querySelector('.rainbow-bg')) {
        const rainbowEl = document.createElement('div');
        rainbowEl.className = 'rainbow-bg';
        box.appendChild(rainbowEl);
      }
      
      // Add hover effect with passive option for better performance
      box.addEventListener('mouseenter', () => {
        const rainbowEl = box.querySelector('.rainbow-bg');
        if (rainbowEl) rainbowEl.style.opacity = '0.9';
      }, { passive: true });
      
      box.addEventListener('mouseleave', () => {
        const rainbowEl = box.querySelector('.rainbow-bg');
        if (rainbowEl) rainbowEl.style.opacity = '0.7';
      }, { passive: true });
      
      // Add static filter to images instead of animations for better performance
      const images = box.querySelectorAll('img');
      images.forEach(img => {
        // Random brightness between 90% and 110%
        const brightness = 90 + Math.floor(Math.random() * 20);
        // Random contrast between 95% and 105%
        const contrast = 95 + Math.floor(Math.random() * 10);
        // Random saturation between 95% and 110%
        const saturation = 95 + Math.floor(Math.random() * 15);
        
        // Apply static filter instead of animation for better performance
        img.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      });
    });
  });

  // Stars are now handled by stars-background.js
  
  // Mobile-specific optimizations
  if (isMobile) {
    // Optimize image rendering
    document.querySelectorAll('img:not(.popup-image)').forEach(img => {
      img.style.backfaceVisibility = 'hidden';
      img.style.perspective = '1000px';
      img.style.transform = 'translate3d(0,0,0)';
    });
    
    // Make sure popup image keeps its rotation
    const popupImage = document.querySelector('.popup-image');
    if (popupImage) {
      popupImage.style.backfaceVisibility = 'hidden';
      popupImage.style.perspective = '1000px';
      popupImage.style.transform = 'rotate(90deg)';
    }
    
    // Force all animations to run continuously
    document.querySelectorAll('.rainbow-box').forEach(box => {
      const bg = box.querySelector('.rainbow-bg');
      if (bg) {
        // Ensure animation always runs
        bg.style.animationPlayState = 'running';
      }
    });
    
    // Use IntersectionObserver to optimize visible elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const bg = entry.target.querySelector('.rainbow-bg');
        if (entry.isIntersecting) {
          // Element is visible, full effects
          entry.target.classList.add('in-view');
          if (bg) {
            bg.style.opacity = '0.7';
          }
        } else {
          // Element is not visible, reduce effects but keep animations running
          entry.target.classList.remove('in-view');
          if (bg) {
            bg.style.opacity = '0.3';
          }
        }
      });
    }, { rootMargin: '100px' });
    
    // Observe all rainbow boxes
    document.querySelectorAll('.rainbow-box').forEach(box => {
      observer.observe(box);
    });
  }

  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';

  const lightboxImg = document.createElement('img');
  lightboxImg.className = 'lightbox-content';
  lightboxImg.alt = 'Enlarged preview';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'close';
  closeBtn.innerHTML = '&times;';
  closeBtn.setAttribute('aria-label', 'Close preview');

  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);

  // Open lightbox when clicking rainbow-box
  document.querySelectorAll('.rainbow-box').forEach(box => {
    box.addEventListener('click', () => {
      const img = box.querySelector('img');
      if (!img) return;
      
      // Preload image
      const preloadImg = new Image();
      preloadImg.src = img.src;
      
      preloadImg.onload = () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Enlarged image';
        
        // Show lightbox with animation
        requestAnimationFrame(() => {
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      };
    });
  });

  // Close lightbox function
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    
    // Wait for transition to complete before removing overflow hidden
    setTimeout(() => {
      document.body.style.overflow = '';
    }, 300);
  };

  // Close lightbox on clicking background or close button
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === closeBtn) {
      closeLightbox();
    }
  });

  // Close lightbox on pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});