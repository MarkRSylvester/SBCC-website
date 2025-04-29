document.addEventListener('DOMContentLoaded', function() {
    // Find the existing JUST EXPLORING button
    const buttons = document.querySelectorAll('a, button');
    let exploreButton = null;
    
    for (let button of buttons) {
        if (button.textContent.trim() === 'JUST EXPLORING') {
            exploreButton = button;
            break;
        }
    }
    
    if (exploreButton) {
        // Connect it to the modal
        exploreButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('exploreModal').classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Modal close functionality
    const closeButton = document.querySelector('.sbcc-modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            document.getElementById('exploreModal').classList.remove('open');
            document.body.style.overflow = '';
        });
    }
    
    // Close when clicking outside
    const modal = document.getElementById('exploreModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.sbcc-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.sbcc-accordion-icon');
            
            // Toggle content
            content.classList.toggle('open');
            
            // Toggle icon
            icon.textContent = content.classList.contains('open') ? '-' : '+';
        });
    });
}); 