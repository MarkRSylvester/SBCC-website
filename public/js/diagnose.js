// SBCC Diagnostic
console.log("SBCC Diagnostic running");
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");
  var beyondAccordion = document.querySelector(".accordion-item h3:contains(Beyond the Table)");
  if (!beyondAccordion) { beyondAccordion = document.querySelector("h3:contains(Beyond the Table)"); }
  console.log("Found beyond accordion:", !!beyondAccordion);
  
  if (beyondAccordion) {
    var parent = beyondAccordion.closest(".accordion-item");
    console.log("Parent item ID:", parent ? parent.id : "none");
  }
  
  var allAccordions = document.querySelectorAll(".accordion-item");
  console.log("Total accordions:", allAccordions.length);
  
  // Fix Beyond the Table directly
  var headers = document.querySelectorAll("h3");
  headers.forEach(function(h) {
    if (h.textContent.indexOf("Beyond the Table") >= 0) {
      console.log("Found Beyond the Table header");
      var accordionItem = h.closest(".accordion-item");
      if (accordionItem) {
        var content = accordionItem.querySelector(".accordion-content");
        if (content) {
          console.log("Found content, applying grid");
          setTimeout(function() {
            // Direct HTML insertion for grid
            content.innerHTML = "<p>Extend your culinary experience beyond the dining table.</p><div style=\"display:grid;grid-template-columns:1fr 1fr;gap:20px\"><div style=\"background:#fff;padding:20px\"><h4>Wine Pairing</h4><ul><li>Expert recommendations</li><li>Local vineyards</li></ul></div><div style=\"background:#fff;padding:20px\"><h4>Table Setting</h4><ul><li>Elegant design</li><li>Premium linens</li></ul></div><div style=\"background:#fff;padding:20px\"><h4>Cooking Lessons</h4><ul><li>Hands-on instruction</li><li>Professional methods</li></ul></div><div style=\"background:#fff;padding:20px\"><h4>Produce Boxes</h4><ul><li>Local organic farms</li><li>Artisanal items</li></ul></div></div>";
          }, 1000);
        }
      }
    }
  });
});
