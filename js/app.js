import Modal from './components/Modal.js';
import Accordion from './components/Accordion.js';

class App {
    constructor() {
        this.components = new Map();
        console.group('🚀 SBCC Application Startup');
        console.log('Initializing application...');
        this.init();
    }

    async init() {
        try {
            // Initialize modal system
            console.log('📦 Loading components...');
            
            const modal = new Modal({
                closeOnEscape: true,
                closeOnOutsideClick: true,
                bodyClass: 'modal-open'
            });
            this.components.set('modal', modal);
            console.log('✓ Modal system initialized');

            // Initialize accordion system
            const accordion = new Accordion({
                singleOpen: true,
                scrollIntoView: true
            });
            this.components.set('accordion', accordion);
            console.log('✓ Accordion system initialized');

            // Initialize mobile menu
            this.initMobileMenu();
            console.log('✓ Mobile menu initialized');

            // Initialize fade animations
            this.initFadeAnimations();
            console.log('✓ Fade animations initialized');

            // Set up event listeners
            this.setupEventListeners();
            console.log('✓ Event listeners initialized');

            console.log('🎉 Application initialization complete');
            console.groupEnd();

            // Test all modals exist
            this.validateModals();

        } catch (error) {
            console.error('❌ Error initializing application:', error);
            console.groupEnd();
        }
    }

    validateModals() {
        console.group('🔍 Validating Modals');
        const requiredModals = ['explore-modal', 'event-modal', 'weekly-meals-modal'];
        
        requiredModals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                const trigger = document.querySelector(`[data-modal-target="${modalId}"]`);
                console.log(`✓ Modal "${modalId}" found${trigger ? ' with trigger' : ' but missing trigger'}`);
            } else {
                console.error(`❌ Modal "${modalId}" not found in DOM`);
            }
        });
        console.groupEnd();
    }

    initMobileMenu() {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        if (!hamburgerMenu) {
            console.warn('⚠️ Hamburger menu element not found');
            return;
        }

        const mobileMenu = document.createElement('div');
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

        // Toggle menu on hamburger click
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            console.log(`📱 Mobile menu ${mobileMenu.classList.contains('open') ? 'opened' : 'closed'}`);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (mobileMenu.classList.contains('open')) {
                if (!mobileMenu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                    mobileMenu.classList.remove('open');
                    hamburgerMenu.classList.remove('active');
                    console.log('📱 Mobile menu closed (outside click)');
                }
            }
        });
    }

    initFadeAnimations() {
        const fadeElements = document.querySelectorAll('.hero h2, .hero-tagline, .cta-buttons');
        fadeElements.forEach(element => {
            element.classList.add('fade-in');
        });
        console.log(`✨ Initialized fade animations for ${fadeElements.length} elements`);
    }

    setupEventListeners() {
        // Set up form submission handlers
        this.setupFormHandlers();

        // Set up event listeners for legal links
        ['privacy-policy', 'terms', 'cookies'].forEach(id => {
            const link = document.getElementById(id);
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log(`📜 Legal link clicked: ${id}`);
                    alert(`${id.replace('-', ' ').toUpperCase()} modal would open here`);
                });
            }
        });

        // Listen for modal events
        const modal = this.components.get('modal');
        if (modal) {
            modal.on('modal:open', ({ modalId }) => {
                console.log(`🔓 Modal opened: ${modalId}`);
                this.validateFormFields(modalId);
            });

            modal.on('modal:close', ({ modalId }) => {
                console.log(`🔒 Modal closed: ${modalId}`);
            });
        }

        // Listen for accordion events
        const accordion = this.components.get('accordion');
        if (accordion) {
            accordion.on('accordion:open', ({ id }) => {
                console.log(`📂 Accordion opened: ${id}`);
            });

            accordion.on('accordion:close', ({ id }) => {
                console.log(`📁 Accordion closed: ${id}`);
            });
        }
    }

    setupFormHandlers() {
        const forms = {
            'event-form': 'Event Request',
            'meal-form': 'Weekly Meal Service'
        };

        Object.entries(forms).forEach(([formId, formName]) => {
            const form = document.getElementById(formId);
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    console.group(`📝 Form Submission: ${formName}`);
                    console.log('Form data:', data);
                    this.validateFormData(data, formId);
                    console.groupEnd();
                });
                console.log(`✓ Form handler set up for: ${formName}`);
            } else {
                console.warn(`⚠️ Form not found: ${formId}`);
            }
        });
    }

    validateFormData(data, formId) {
        const requiredFields = {
            'event-form': ['eventType', 'guestCount', 'eventDate', 'name', 'email'],
            'meal-form': ['householdSize', 'mealsPerWeek', 'name', 'email']
        };

        const fields = requiredFields[formId] || [];
        const missing = fields.filter(field => !data[field]);

        if (missing.length > 0) {
            console.error('❌ Missing required fields:', missing);
            return false;
        }

        // Validate email format
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            console.error('❌ Invalid email format');
            return false;
        }

        console.log('✓ Form validation passed');
        return true;
    }

    validateFormFields(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const form = modal.querySelector('form');
        if (!form) return;

        const requiredFields = form.querySelectorAll('[required]');
        console.group(`🔍 Validating form fields in ${modalId}`);
        console.log(`Found ${requiredFields.length} required fields`);
        requiredFields.forEach(field => {
            console.log(`✓ Required field: ${field.name}`);
        });
        console.groupEnd();
    }

    destroy() {
        console.group('🧹 Cleaning up application');
        // Clean up all components
        this.components.forEach((component, name) => {
            if (typeof component.destroy === 'function') {
                component.destroy();
                console.log(`✓ Destroyed ${name} component`);
            }
        });
        this.components.clear();
        console.log('✓ Application cleanup complete');
        console.groupEnd();
    }
}

// Create and expose the app instance
const app = new App();
window.app = app;

export default app; 