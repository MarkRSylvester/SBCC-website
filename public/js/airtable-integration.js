/**
 * Load Gatherings & Celebrations content into the modal
 */
function loadGatheringsContent() {
    const gatheringsContent = document.querySelector('#gatherings-accordion .accordion-content');
    if (!gatheringsContent) return;
    
    // The content is already injected via the script in index.html
    // We just need to ensure it's visible
    gatheringsContent.style.maxHeight = 'none';
    gatheringsContent.style.height = 'auto';
    gatheringsContent.style.overflow = 'visible';
    
    // Add event listener to the Plan Your Gathering button
    const planButton = gatheringsContent.querySelector('.button-primary');
    if (planButton) {
        planButton.addEventListener('click', function() {
            const eventModal = document.getElementById('event-planning-modal');
            if (eventModal) {
                eventModal.style.display = 'flex';
            }
        });
    }
} 