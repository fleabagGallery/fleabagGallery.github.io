// Apply random animation properties to each rainbow box
document.addEventListener('DOMContentLoaded', function() {
  const boxes = document.querySelectorAll('.rainbow-box');
  
  boxes.forEach(box => {
    // Random animation duration between 3.5 and 5.5 seconds
    const duration = (3.5 + Math.random() * 2).toFixed(1);
    
    // Random delay between 0 and 3 seconds
    const delay = (Math.random() * 3).toFixed(1);
    
    // Apply the random values
    box.style.animationDuration = `${duration}s`;
    box.style.animationDelay = `${delay}s`;
  });
});