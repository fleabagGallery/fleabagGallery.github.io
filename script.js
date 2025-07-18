document.addEventListener('DOMContentLoaded', () => {
  // Detect if we're on mobile
  const isMobile = window.innerWidth < 768;
  
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    // Add staggered animation delay and random offsets to rainbow boxes
    document.querySelectorAll('.rainbow-box').forEach((box, index) => {
      // On mobile, only apply minimal styling
      if (!isMobile) {
        // Limit animation delays to reduce simultaneous animations
        box.style.animationDelay = `${index % 5 * 0.2}s`;
        
        // Add random margin offsets for a more natural look
        const randomMarginTop = Math.floor(Math.random() * 15) - 5;
        const randomMarginLeft = Math.floor(Math.random() * 10) - 5;
        box.style.marginTop = `${randomMarginTop}px`;
        box.style.marginLeft = `${randomMarginLeft}px`;
      }
      
      // Create a pseudo-element for the rainbow effect
      if (!box.querySelector('.rainbow-bg')) {
        const rainbowEl = document.createElement('div');
        rainbowEl.className = 'rainbow-bg';
        box.appendChild(rainbowEl);
      }
      
      // Only add hover effects on desktop
      if (!isMobile) {
        // Add hover effect with passive option for better performance
        box.addEventListener('mouseenter', () => {
          const rainbowEl = box.querySelector('.rainbow-bg');
          if (rainbowEl) rainbowEl.style.opacity = '0.9';
        }, { passive: true });
        
        box.addEventListener('mouseleave', () => {
          const rainbowEl = box.querySelector('.rainbow-bg');
          if (rainbowEl) rainbowEl.style.opacity = '0.7';
        }, { passive: true });
      }
      
      // Add static filter to images instead of animations for better performance
      const images = box.querySelectorAll('img');
      images.forEach(img => {
        if (!isMobile) {
          // Random brightness between 90% and 110%
          const brightness = 90 + Math.floor(Math.random() * 20);
          // Random contrast between 95% and 105%
          const contrast = 95 + Math.floor(Math.random() * 10);
          // Random saturation between 95% and 110%
          const saturation = 95 + Math.floor(Math.random() * 15);
          
          // Apply static filter instead of animation for better performance
          img.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
        }
      });
    });
  });

  // Only create stars if not on mobile or reduce count significantly
  if (!isMobile) {
    // Create starry sky with reduced number of stars
    const starrySky = document.createElement('div');
    starrySky.className = 'starry-sky';
    document.body.prepend(starrySky);

    // Create stars with reduced count for better performance
    // Use a document fragment to batch DOM operations
    const starsFragment = document.createDocumentFragment();
    const starCount = 100; // Full count for desktop
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      
      // Random size (1-3px)
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random animation duration and delay
      star.style.setProperty('--pulse-duration', `${Math.random() * 3 + 2}s`);
      star.style.setProperty('--pulse-delay', `${Math.random() * 5}s`);
      
      starsFragment.appendChild(star);
    }
    
    // Add all stars at once to minimize reflows
    starrySky.appendChild(starsFragment);
  } else {
    // For mobile, create a minimal starry sky with very few stars
    const starrySky = document.createElement('div');
    starrySky.className = 'starry-sky';
    document.body.prepend(starrySky);
    
    // Create just a few static stars for mobile
    const starsFragment = document.createDocumentFragment();
    const starCount = 20; // Very few stars for mobile
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = '2px';
      star.style.height = '2px';
      star.style.opacity = '0.7';
      starsFragment.appendChild(star);
    }
    
    starrySky.appendChild(starsFragment);
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
