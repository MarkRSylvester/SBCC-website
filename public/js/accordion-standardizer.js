console.log("Accordion standardizer loaded");
document.addEventListener('DOMContentLoaded', function() {
  // Add a + icon to accordion headers if they don't have one
  var accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(function(header) {
    // Check if header already has an icon
    if (!header.querySelector('.accordion-icon')) {
      var icon = document.createElement('div');
      icon.className = 'accordion-icon';
      header.appendChild(icon);
    }
  });
});
