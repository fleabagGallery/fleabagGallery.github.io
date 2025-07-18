// Show commissions image when clicking on popup
document.addEventListener('DOMContentLoaded', () => {
  const commissionPopup = document.getElementById('commissions-popup');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-content');
  
  if (commissionPopup && lightbox && lightboxImg) {
    commissionPopup.addEventListener('click', () => {
      // Preload image
      const preloadImg = new Image();
      preloadImg.src = './images/comms.jpg';
      
      preloadImg.onload = () => {
        lightboxImg.src = './images/comms.jpg';
        lightboxImg.alt = 'Commission information';
        
        // Show lightbox with animation
        requestAnimationFrame(() => {
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      };
    });
  }
});