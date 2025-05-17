// Script to replace all standard horizontal rules with styled tapered dividers
(function() {
  // Add our custom style
  var style = document.createElement('style');
  style.textContent = 
    ".tapered-divider {" +
    "  display: block;" +
    "  height: 1.5px;" +
    "  width: 75%;" +
    "  max-width: 300px;" +
    "  margin: 30px auto;" +
    "  border: none;" +
    "  background: linear-gradient(to right, " +
    "              rgba(74, 93, 35, 0), " +
    "              rgba(74, 93, 35, 0.8) 30%, " +
    "              rgba(74, 93, 35, 0.8) 70%, " +
    "              rgba(74, 93, 35, 0));" +
    "}";
  document.head.appendChild(style);
  
  // Find and replace all horizontal rules
  var horizontalRules = document.querySelectorAll('hr');
  
  horizontalRules.forEach(function(rule) {
    var taperedDivider = document.createElement('hr');
    taperedDivider.className = 'tapered-divider';
    rule.parentNode.replaceChild(taperedDivider, rule);
  });
  
  console.log('Replaced horizontal rules with tapered dividers');
})();
