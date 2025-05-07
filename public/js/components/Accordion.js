import EventEmitter from '../core/EventEmitter.js';

class Accordion extends EventEmitter {
    constructor(options = {}) {
        super();
        this.options = {
            singleOpen: true, // Only one accordion can be open at a time
            animationDuration: 300,
            scrollIntoView: true,
            ...options
        };

        this.accordions = new Map();
        this.init();
    }

    init() {
        document.querySelectorAll('.accordion-item').forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            if (!header || !content) return;

            const id = item.id || `accordion-${Math.random().toString(36).substr(2, 9)}`;
            item.id = id;

            this.accordions.set(id, {
                element: item,
                header,
                content,
                isOpen: false
            });

            this.setupAccordion(id);
        });

        console.log('Accordion system initialized with', this.accordions.size, 'accordions');
    }

    setupAccordion(id) {
        const accordion = this.accordions.get(id);
        if (!accordion) return;

        // Add accessibility attributes
        accordion.header.setAttribute('role', 'button');
        accordion.header.setAttribute('aria-expanded', 'false');
        accordion.header.setAttribute('aria-controls', `content-${id}`);
        accordion.content.id = `content-${id}`;
        accordion.content.setAttribute('role', 'region');
        accordion.content.setAttribute('aria-labelledby', `header-${id}`);

        // Add click handler
        accordion.header.addEventListener('click', () => this.toggle(id));

        // Add arrow icon if it doesn't exist
        if (!accordion.header.querySelector('.accordion-arrow')) {
            const arrow = document.createElement('span');
            arrow.className = 'accordion-arrow';
            accordion.header.appendChild(arrow);
        }
    }

    toggle(id) {
        const accordion = this.accordions.get(id);
        if (!accordion) {
            console.error(`Accordion with id "${id}" not found`);
            return;
        }

        try {
            const isOpening = !accordion.isOpen;

            // Close other accordions if singleOpen is true
            if (isOpening && this.options.singleOpen) {
                this.accordions.forEach((acc, accId) => {
                    if (accId !== id && acc.isOpen) {
                        this.close(accId);
                    }
                });
            }

            if (isOpening) {
                this.open(id);
            } else {
                this.close(id);
            }

        } catch (error) {
            console.error(`Error toggling accordion "${id}":`, error);
        }
    }

    open(id) {
        const accordion = this.accordions.get(id);
        if (!accordion || accordion.isOpen) return;

        try {
            const { element, header, content } = accordion;

            // Update state and attributes
            accordion.isOpen = true;
            element.classList.add('active');
            header.setAttribute('aria-expanded', 'true');

            // Animate content
            content.style.maxHeight = `${content.scrollHeight}px`;
            content.style.opacity = '1';

            // Scroll into view if needed
            if (this.options.scrollIntoView) {
                const headerRect = header.getBoundingClientRect();
                const isOffscreen = headerRect.top < 0 || headerRect.bottom > window.innerHeight;
                
                if (isOffscreen) {
                    header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }

            this.emit('accordion:open', { id });
            console.log(`Accordion "${id}" opened`);

        } catch (error) {
            console.error(`Error opening accordion "${id}":`, error);
        }
    }

    close(id) {
        const accordion = this.accordions.get(id);
        if (!accordion || !accordion.isOpen) return;

        try {
            const { element, header, content } = accordion;

            // Update state and attributes
            accordion.isOpen = false;
            element.classList.remove('active');
            header.setAttribute('aria-expanded', 'false');

            // Animate content
            content.style.maxHeight = '0';
            content.style.opacity = '0';

            this.emit('accordion:close', { id });
            console.log(`Accordion "${id}" closed`);

        } catch (error) {
            console.error(`Error closing accordion "${id}":`, error);
        }
    }

    closeAll() {
        this.accordions.forEach((_, id) => this.close(id));
    }

    destroy() {
        this.accordions.forEach((accordion, id) => {
            accordion.header.removeEventListener('click', () => this.toggle(id));
            
            // Remove added attributes
            accordion.header.removeAttribute('role');
            accordion.header.removeAttribute('aria-expanded');
            accordion.header.removeAttribute('aria-controls');
            accordion.content.removeAttribute('role');
            accordion.content.removeAttribute('aria-labelledby');
        });

        this.accordions.clear();
        this.clear(); // Clear event emitter
        console.log('Accordion system destroyed');
    }
}

export default Accordion; 