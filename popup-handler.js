// Show commissions image when clicking on popup - optimized
document.addEventListener('DOMContentLoaded', () => {
  // Defer non-critical initialization
  setTimeout(() => {
    const commissionPopup = document.getElementById('commissions-popup');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content');
    
    if (commissionPopup && lightbox && lightboxImg) {
      // Preload the commission image after page load
      const preloadImg = new Image();
      preloadImg.src = './images/comms.jpg';
      
      // Use passive event listener for better performance
      commissionPopup.addEventListener('click', () => {
        lightboxImg.src = './images/comms.jpg';
        lightboxImg.alt = 'Commission information';
        
        // Show lightbox with animation
        requestAnimationFrame(() => {
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      }, { passive: true });
    }
  }, 300); // Delay initialization to prioritize critical rendering
});