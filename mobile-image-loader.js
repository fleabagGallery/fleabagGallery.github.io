// Mobile image optimization
document.addEventListener('DOMContentLoaded', () => {
  // Check if device is mobile
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Disable animations during initial load
    document.body.classList.add('loading-images');
    
    // Get all images
    const images = document.querySelectorAll('.rainbow-box img');
    let loadedCount = 0;
    const totalImages = images.length;
    
    // Process each image
    images.forEach(img => {
      // Set smaller size for mobile
      img.setAttribute('width', '300');
      
      // Use native lazy loading
      img.loading = 'lazy';
      
      // Track when images are loaded
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= Math.min(5, totalImages)) {
          // Enable animations after first few images load
          document.body.classList.remove('loading-images');
        }
      };
    });
    
    // Fallback to enable animations if images take too long
    setTimeout(() => {
      document.body.classList.remove('loading-images');
    }, 3000);
  }
});