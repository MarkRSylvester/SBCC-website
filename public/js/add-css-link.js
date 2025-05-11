document.addEventListener('DOMContentLoaded', function() {
  // Create a link element
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/css/accordion-fix.css';
  
  // Add it to the head
  document.head.appendChild(link);
  
  console.log('Added accordion CSS link dynamically');
});
