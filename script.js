document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    
    hamburgerMenu.addEventListener('click', function() {
        // Toggle hamburger active state (creates X appearance)
        this.classList.toggle('active');
        
        // Create modal popup for menu if it doesn't exist
        let mobileMenu = document.getElementById('mobileMenu');
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.id = 'mobileMenu';
            mobileMenu.className = 'mobile-menu';
            
            // Create menu items
            const menuItems = [
                { text: 'Home', href: '#' },
                { text: 'Meet the Chefs', href: '#' },
                { text: 'Plan an Event', href: '#' },
                { text: 'Weekly Meals', href: '#' },
                { text: 'Our Menus', href: '#' },
                { text: 'Services', href: '#' },
                { text: 'About', href: '#' },
                { text: 'FAQ', href: '#' },
                { text: 'Contact', href: '#' }
            ];
            
            const menuList = document.createElement('ul');
            menuItems.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = item.text;
                a.href = item.href;
                li.appendChild(a);
                menuList.appendChild(li);
            });
            
            mobileMenu.appendChild(menuList);
            document.body.appendChild(mobileMenu);
        }
        
        // Toggle menu visibility
        mobileMenu.classList.toggle('open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            if (!mobileMenu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                mobileMenu.classList.remove('open');
                hamburgerMenu.classList.remove('active');
            }
        }
    });

    // Add fade-in animation to elements
    const fadeElements = document.querySelectorAll('.hero h2, .hero-tagline, .cta-buttons');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });

    // Handle button clicks with proper error handling
    const exploreChefsBtn = document.getElementById('explore-chefs-btn');
    const planEventBtn = document.getElementById('plan-event-btn');
    const contactBtn = document.getElementById('contact-btn');

    if (exploreChefsBtn) {
        exploreChefsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            try {
                const modalType = this.getAttribute('data-modal');
                if (modalType) {
                    openModal(modalType);
                }
            } catch (error) {
                console.error('Error handling explore chefs button click:', error);
            }
        });
    }

    if (planEventBtn) {
        planEventBtn.addEventListener('click', function(e) {
            e.preventDefault();
            try {
                const modalType = this.getAttribute('data-modal');
                if (modalType) {
                    openModal(modalType);
                }
            } catch (error) {
                console.error('Error handling plan event button click:', error);
            }
        });
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            try {
                const modalType = this.getAttribute('data-modal');
                if (modalType) {
                    openModal(modalType);
                }
            } catch (error) {
                console.error('Error handling contact button click:', error);
            }
        });
    }

    // Modal functionality
    const modalContainer = document.getElementById('modal-container');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-modal');

    // Function to open modal
    window.openModal = function(modalType) {
        try {
            // Show loading spinner
            modalBody.innerHTML = '<div class="loading-spinner"></div>';
            modalContainer.style.display = 'block';
            
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
            
            // Load content based on modal type
            switch(modalType) {
                case 'chefs':
                    loadChefProfiles();
                    break;
                case 'plan-event':
                    loadEventPlanningForm();
                    break;
                case 'weekly-meals':
                    loadWeeklyMealsInfo();
                    break;
                case 'menus':
                    loadMenuData();
                    break;
                case 'services':
                    loadServicesInfo();
                    break;
                case 'about':
                    loadAboutInfo();
                    break;
                case 'faq':
                    loadFAQContent();
                    break;
                case 'contact':
                    loadContactForm();
                    break;
                default:
                    modalBody.innerHTML = '<h2>Content Not Available</h2><p>This content is currently unavailable.</p>';
            }
        } catch (error) {
            console.error('Error opening modal:', error);
            modalBody.innerHTML = '<h2>Error</h2><p>An error occurred while loading the content. Please try again later.</p>';
        }
    };

    // Function to close modal
    window.closeModal = function() {
        modalContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // Close modal when clicking the close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the modal content
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            closeModal();
        }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalContainer.style.display === 'block') {
            closeModal();
        }
    });

    // Log a message to confirm script is running
    console.log('SBCC website script initialized');

    // Set up event listeners for the main CTA buttons
    document.getElementById('just-exploring').addEventListener('click', function(e) {
        e.preventDefault();
        // Open Exploring Modal - placeholder for now
        alert("Opening Exploring Modal");
    });
    
    document.getElementById('plan-event').addEventListener('click', function(e) {
        e.preventDefault();
        // Open Event Planning Journey Modal - placeholder for now
        alert("Opening Event Planning Journey Modal");
    });
    
    document.getElementById('weekly-meals').addEventListener('click', function(e) {
        e.preventDefault();
        // Open Weekly Meal Service Journey Modal - placeholder for now
        alert("Opening Weekly Meal Service Journey Modal");
    });
    
    // Set up event listeners for legal links
    document.getElementById('privacy-policy').addEventListener('click', function(e) {
        e.preventDefault();
        alert("Privacy Policy modal would open here");
    });
    
    document.getElementById('terms').addEventListener('click', function(e) {
        e.preventDefault();
        alert("Terms & Conditions modal would open here");
    });
    
    document.getElementById('cookies').addEventListener('click', function(e) {
        e.preventDefault();
        alert("Cookie Policy modal would open here");
    });
});