// Initialize the Beyond the Table accordion with tabbed navigation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize accordion functionality if not already present
    initializeAccordion();
    
    // Initialize category tabs
    initializeCategoryTabs();
});

// Initialize accordion functionality
function initializeAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.closest('.accordion-item');
            
            // Toggle active class
            accordionItem.classList.toggle('active');
            
            // Toggle aria-expanded for accessibility
            const expanded = accordionItem.classList.contains('active');
            this.setAttribute('aria-expanded', expanded);
            
            // Rotate icon
            const icon = this.querySelector('.accordion-icon');
            if (icon) {
                icon.style.transform = expanded ? 'rotate(180deg)' : 'rotate(0)';
            }
        });
    });
}

// Initialize category tabs
function initializeCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const serviceSections = document.querySelectorAll('.service-section');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get category
            const category = this.getAttribute('data-category');
            
            // Hide all service sections
            serviceSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected service section
            const selectedSection = document.querySelector(`.service-section[data-category="${category}"]`);
            if (selectedSection) {
                selectedSection.classList.add('active');
                
                // Scroll to top of sections
                const content = document.querySelector('#beyond-table-accordion .accordion-content');
                if (content) {
                    // Scroll a little below the tabs
                    const tabsHeight = document.querySelector('.service-categories').offsetHeight;
                    content.scrollTop = tabsHeight + 10;
                }
            }
        });
    });
} 