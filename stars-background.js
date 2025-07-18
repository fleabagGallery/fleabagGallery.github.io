// Prerendered stars background
document.addEventListener('DOMContentLoaded', function() {
  // Create stars container
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars-container';
  
  // Create 180 stars with prerendered positions
  const starPositions = [];
  const starSizes = ['tiny', 'small', 'medium', 'large'];
  const starDelays = [];
  
  // Generate 180 unique star positions
  for (let i = 0; i < 180; i++) {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    const size = starSizes[Math.floor(Math.random() * starSizes.length)];
    const delay = Math.random() * 5; // Random delay between 0-5s
    
    starPositions.push({ x, y, size });
    starDelays.push(delay);
  }
  
  // Create HTML for all stars at once
  let starsHTML = '';
  
  for (let i = 0; i < 180; i++) {
    const { x, y, size } = starPositions[i];
    const delay = starDelays[i];
    
    // Add animation group class for better distribution
    const animGroup = i % 4;
    starsHTML += `<div class="star ${size} anim-group-${animGroup}" style="left: ${x}%; top: ${y}%; animation-delay: ${delay}s;"></div>`;
  }
  
  // Set the HTML all at once (more efficient)
  starsContainer.innerHTML = starsHTML;
  
  // Add to document
  document.body.insertBefore(starsContainer, document.body.firstChild);
});