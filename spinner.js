// Create the spinner element
var spinner = document.createElement('div');
spinner.className = 'dots-bars-5';

// Append the spinner to the body
document.body.appendChild(spinner);

// Define styles for the spinner and its dot
spinner.style.display = 'flex';
spinner.style.justifyContent = 'center';
spinner.style.alignItems = 'center';
spinner.style.height = '100vh';

var dot = document.createElement('div');
dot.className = 'dot';
spinner.appendChild(dot);

dot.style.width = '8px';
dot.style.height = '8px';
dot.style.borderRadius = '50%';
dot.style.background = 'currentColor';
dot.style.marginRight = '8px'; // Adjust as needed

// Define keyframe animations
var keyframes = document.styleSheets[0].insertRule('@keyframes db5-1 {' +
  '0% { left: -16px; transform: translateY(-8px); }' +
  '100% { left: calc(100% + 8px); transform: translateY(22px); }' +
  '}', 0);

var keyframes2 = document.styleSheets[0].insertRule('@keyframes db5-2 {' +
  '100% { top: -0.1px; }' +
  '}', 0);

// Apply the animation to the dot
dot.style.animation = 'db5-1 2s linear infinite, db5-2 0.5s cubic-bezier(0, 200, 0.8, 200) infinite';