import EventEmitter from '../core/EventEmitter.js';

class Modal extends EventEmitter {
    constructor(options = {}) {
        super();
        this.options = {
            closeOnEscape: true,
            closeOnOutsideClick: true,
            bodyClass: 'modal-open',
            ...options
        };
        
        this.modals = new Map();
        this.activeModal = null;
        this.boundHandleKeydown = this.handleKeydown.bind(this);
        
        this.init();
    }

    init() {
        // Initialize all modals on the page
        document.querySelectorAll('.modal').forEach(modal => {
            this.modals.set(modal.id, {
                element: modal,
                triggers: document.querySelectorAll(`[data-modal-target="${modal.id}"]`),
                closeButtons: modal.querySelectorAll('.modal-close')
            });
        });

        this.setupEventListeners();
        console.log('Modal system initialized with', this.modals.size, 'modals');
    }

    setupEventListeners() {
        // Set up triggers
        this.modals.forEach((modalData, modalId) => {
            modalData.triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.open(modalId);
                });
            });

            modalData.closeButtons.forEach(button => {
                button.addEventListener('click', () => this.close(modalId));
            });

            if (this.options.closeOnOutsideClick) {
                modalData.element.addEventListener('click', (e) => {
                    if (e.target === modalData.element) {
                        this.close(modalId);
                    }
                });
            }
        });

        if (this.options.closeOnEscape) {
            document.addEventListener('keydown', this.boundHandleKeydown);
        }
    }

    handleKeydown(e) {
        if (e.key === 'Escape' && this.activeModal) {
            this.close(this.activeModal);
        }
    }

    open(modalId) {
        const modalData = this.modals.get(modalId);
        if (!modalData) {
            console.error(`Modal with id "${modalId}" not found`);
            return;
        }

        // Close any open modal first
        if (this.activeModal) {
            this.close(this.activeModal);
        }

        try {
            modalData.element.style.display = 'flex';
            document.body.classList.add(this.options.bodyClass);
            this.activeModal = modalId;
            this.emit('modal:open', { modalId });
            console.log(`Modal "${modalId}" opened`);
        } catch (error) {
            console.error(`Error opening modal "${modalId}":`, error);
        }
    }

    close(modalId) {
        const modalData = this.modals.get(modalId);
        if (!modalData) {
            console.error(`Modal with id "${modalId}" not found`);
            return;
        }

        try {
            modalData.element.style.display = 'none';
            document.body.classList.remove(this.options.bodyClass);
            this.activeModal = null;
            this.emit('modal:close', { modalId });
            console.log(`Modal "${modalId}" closed`);
        } catch (error) {
            console.error(`Error closing modal "${modalId}":`, error);
        }
    }

    closeAll() {
        this.modals.forEach((_, modalId) => this.close(modalId));
    }

    destroy() {
        // Clean up all event listeners
        this.modals.forEach((modalData, modalId) => {
            modalData.triggers.forEach(trigger => {
                trigger.removeEventListener('click', () => this.open(modalId));
            });

            modalData.closeButtons.forEach(button => {
                button.removeEventListener('click', () => this.close(modalId));
            });

            if (this.options.closeOnOutsideClick) {
                modalData.element.removeEventListener('click', (e) => {
                    if (e.target === modalData.element) this.close(modalId);
                });
            }
        });

        if (this.options.closeOnEscape) {
            document.removeEventListener('keydown', this.boundHandleKeydown);
        }

        this.modals.clear();
        this.clear(); // Clear event emitter
        console.log('Modal system destroyed');
    }
}

export default Modal; 