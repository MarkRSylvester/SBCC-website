/**
 * Airtable Integration for Santa Barbara Chef Collective
 * This file contains functions to interact with Airtable API
 */

// Airtable API Configuration
const AIRTABLE_CONFIG = {
    apiKey: 'YOUR_AIRTABLE_API_KEY', // Replace with your actual API key
    baseId: 'YOUR_AIRTABLE_BASE_ID', // Replace with your actual base ID
    tables: {
        chefs: 'Chefs',
        menus: 'Menus',
        faq: 'FAQ',
        contact: 'Contact Submissions'
    }
};

// Cache for storing fetched data
const dataCache = {
    chefs: null,
    menus: null,
    faq: null,
    lastUpdated: {}
};

// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

/**
 * Generic function to fetch data from Airtable
 * @param {string} tableName - Name of the Airtable table
 * @param {string} view - View name (optional)
 * @param {Array} fields - Fields to fetch (optional)
 * @returns {Promise} - Promise with the fetched data
 */
async function fetchFromAirtable(tableName, view = 'Grid view', fields = []) {
    try {
        // Check if we have cached data that's still valid
        if (dataCache[tableName] && 
            dataCache.lastUpdated[tableName] && 
            (Date.now() - dataCache.lastUpdated[tableName] < CACHE_EXPIRATION)) {
            console.log(`Using cached data for ${tableName}`);
            return dataCache[tableName];
        }

        // Show loading state
        const modalBody = document.getElementById('modal-body');
        if (modalBody) {
            modalBody.innerHTML = '<div class="loading-spinner"></div>';
        }

        // Construct the API URL
        const baseUrl = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${AIRTABLE_CONFIG.tables[tableName]}`;
        let url = baseUrl;
        
        // Add view parameter if provided
        if (view) {
            url += `?view=${encodeURIComponent(view)}`;
        }
        
        // Add fields parameter if provided
        if (fields.length > 0) {
            const separator = url.includes('?') ? '&' : '?';
            url += `${separator}fields=${fields.map(field => encodeURIComponent(field)).join(',')}`;
        }

        // Fetch data from Airtable
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
        }

        // Parse the response
        const data = await response.json();
        
        // Cache the data
        dataCache[tableName] = data;
        dataCache.lastUpdated[tableName] = Date.now();
        
        return data;
    } catch (error) {
        console.error(`Error fetching data from Airtable (${tableName}):`, error);
        throw error;
    }
}

/**
 * Fetch chef profiles from Airtable
 * @returns {Promise} - Promise with the chef profiles
 */
async function fetchChefProfiles() {
    try {
        const data = await fetchFromAirtable('chefs', 'Grid view', [
            'Name', 'Bio', 'Specialties', 'Image', 'Experience', 'Contact'
        ]);
        return data;
    } catch (error) {
        console.error('Error fetching chef profiles:', error);
        throw error;
    }
}

/**
 * Fetch menu data from Airtable
 * @returns {Promise} - Promise with the menu data
 */
async function fetchMenuData() {
    try {
        const data = await fetchFromAirtable('menus', 'Grid view', [
            'Name', 'Description', 'Categories', 'Price Range', 'Image'
        ]);
        return data;
    } catch (error) {
        console.error('Error fetching menu data:', error);
        throw error;
    }
}

/**
 * Fetch FAQ content from Airtable
 * @returns {Promise} - Promise with the FAQ content
 */
async function fetchFAQContent() {
    try {
        const data = await fetchFromAirtable('faq', 'Grid view', [
            'Question', 'Answer', 'Category'
        ]);
        return data;
    } catch (error) {
        console.error('Error fetching FAQ content:', error);
        throw error;
    }
}

/**
 * Submit a form to Airtable
 * @param {string} formType - Type of form (contact, event, etc.)
 * @param {Object} formData - Form data to submit
 * @returns {Promise} - Promise with the submission result
 */
async function submitFormToAirtable(formType, formData) {
    try {
        // Show loading state
        const modalBody = document.getElementById('modal-body');
        if (modalBody) {
            modalBody.innerHTML = '<div class="loading-spinner"></div>';
        }

        // Construct the API URL
        const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${AIRTABLE_CONFIG.tables[formType]}`;
        
        // Prepare the data for Airtable
        const airtableData = {
            fields: formData
        };
        
        // Submit data to Airtable
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(airtableData)
        });
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
        }
        
        // Parse the response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error submitting form to Airtable (${formType}):`, error);
        throw error;
    }
}

/**
 * Load chef profiles into the modal
 */
async function loadChefProfiles() {
    try {
        const modalBody = document.getElementById('modal-body');
        if (!modalBody) return;
        
        // Show loading spinner
        modalBody.innerHTML = '<div class="loading-spinner"></div>';
        
        // Fetch chef profiles
        const data = await fetchChefProfiles();
        
        // Generate HTML for chef profiles
        let html = '<h2>Meet Our Chefs</h2>';
        
        if (data.records && data.records.length > 0) {
            html += '<div class="chefs-grid">';
            
            data.records.forEach(record => {
                const fields = record.fields;
                const name = fields.Name || 'Chef';
                const bio = fields.Bio || 'No bio available';
                const specialties = fields.Specialties || [];
                const imageUrl = fields.Image && fields.Image[0] ? fields.Image[0].url : '';
                
                html += `
                    <div class="chef-card">
                        <div class="chef-image">
                            <img src="${imageUrl}" alt="${name}">
                        </div>
                        <div class="chef-info">
                            <h3>${name}</h3>
                            <p>${bio}</p>
                            ${specialties.length > 0 ? `<p><strong>Specialties:</strong> ${specialties.join(', ')}</p>` : ''}
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
        } else {
            html += '<p>No chef profiles available at this time.</p>';
        }
        
        // Update modal content
        modalBody.innerHTML = html;
    } catch (error) {
        console.error('Error loading chef profiles:', error);
        const modalBody = document.getElementById('modal-body');
        if (modalBody) {
            modalBody.innerHTML = '<h2>Error</h2><p>Failed to load chef profiles. Please try again later.</p>';
        }
    }
}

/**
 * Load event planning form into the modal
 */
function loadEventPlanningForm() {
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;
    
    const html = `
        <h2>Plan Your Event</h2>
        <form id="event-planning-form">
            <div class="form-group">
                <label for="name">Your Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" name="phone">
            </div>
            <div class="form-group">
                <label for="event-type">Event Type</label>
                <select id="event-type" name="eventType" required>
                    <option value="">Select an event type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="guests">Number of Guests</label>
                <input type="number" id="guests" name="guests" min="1" required>
            </div>
            <div class="form-group">
                <label for="date">Event Date</label>
                <input type="date" id="date" name="date" required>
            </div>
            <div class="form-group">
                <label for="location">Event Location</label>
                <input type="text" id="location" name="location" required>
            </div>
            <div class="form-group">
                <label for="message">Additional Details</label>
                <textarea id="message" name="message" rows="4"></textarea>
            </div>
            <button type="submit" class="btn">Submit Request</button>
        </form>
    `;
    
    modalBody.innerHTML = html;
    
    // Add event listener for form submission
    const form = document.getElementById('event-planning-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.textContent = 'Submitting...';
                    submitButton.disabled = true;
                }
                
                // Collect form data
                const formData = {
                    Name: form.querySelector('#name').value,
                    Email: form.querySelector('#email').value,
                    Phone: form.querySelector('#phone').value,
                    'Event Type': form.querySelector('#event-type').value,
                    'Number of Guests': parseInt(form.querySelector('#guests').value),
                    'Event Date': form.querySelector('#date').value,
                    'Event Location': form.querySelector('#location').value,
                    'Additional Details': form.querySelector('#message').value,
                    'Submission Type': 'Event Planning'
                };
                
                // Submit form to Airtable
                await submitFormToAirtable('contact', formData);
                
                // Show success message
                modalBody.innerHTML = `
                    <h2>Thank You!</h2>
                    <p>Your event planning request has been submitted successfully. We'll be in touch soon.</p>
                    <button class="btn" onclick="closeModal()">Close</button>
                `;
            } catch (error) {
                console.error('Error submitting event planning form:', error);
                modalBody.innerHTML = `
                    <h2>Error</h2>
                    <p>Failed to submit your request. Please try again later.</p>
                    <button class="btn" onclick="closeModal()">Close</button>
                `;
            }
        });
    }
}

/**
 * Load weekly meals information into the modal
 */
function loadWeeklyMealsInfo() {
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;
    
    const html = `
        <h2>Weekly Meals</h2>
        <p>Our weekly meal service provides delicious, chef-prepared meals delivered to your door.</p>
        <div class="info-section">
            <h3>How It Works</h3>
            <ol>
                <li>Choose your meal plan (3, 5, or 7 meals per week)</li>
                <li>Select from our rotating menu of chef-curated dishes</li>
                <li>Receive your meals fresh and ready to heat</li>
                <li>Enjoy restaurant-quality food in the comfort of your home</li>
            </ol>
        </div>
        <div class="info-section">
            <h3>Benefits</h3>
            <ul>
                <li>Save time on meal planning and preparation</li>
                <li>Enjoy healthy, balanced meals</li>
                <li>Support local chefs and sustainable ingredients</li>
                <li>Flexible subscription options</li>
            </ul>
        </div>
        <div class="cta-section">
            <p>Ready to elevate your weekly meals?</p>
            <button class="btn" onclick="openModal('contact')">Get Started</button>
        </div>
    `;
    
    modalBody.innerHTML = html;
}

/**
 * Load menu data into the modal
 */
async function loadMenuData() {
    try {
        const modalBody = document.getElementById('modal-body');
        if (!modalBody) return;
        
        // Show loading spinner
        modalBody.innerHTML = '<div class="loading-spinner"></div>';
        
        // Fetch menu data
        const data = await fetchMenuData();
        
        // Generate HTML for menu data
        let html = '<h2>Our Menus</h2>';
        
        if (data.records && data.records.length > 0) {
            html += '<div class="menus-grid">';
            
            data.records.forEach(record => {
                const fields = record.fields;
                const name = fields.Name || 'Menu';
                const description = fields.Description || 'No description available';
                const categories = fields.Categories || [];
                const priceRange = fields['Price Range'] || 'Price varies';
                const imageUrl = fields.Image && fields.Image[0] ? fields.Image[0].url : '';
                
                html += `
                    <div class="menu-card">
                        <div class="menu-image">
                            <img src="${imageUrl}" alt="${name}">
                        </div>
                        <div class="menu-info">
                            <h3>${name}</h3>
                            <p>${description}</p>
                            ${categories.length > 0 ? `<p><strong>Categories:</strong> ${categories.join(', ')}</p>` : ''}
                            <p><strong>Price Range:</strong> ${priceRange}</p>
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
        } else {
            html += '<p>No menu data available at this time.</p>';
        }
        
        // Update modal content
        modalBody.innerHTML = html;
    } catch (error) {
        console.error('Error loading menu data:', error);
        const modalBody = document.getElementById('modal-body');
        if (modalBody) {
            modalBody.innerHTML = '<h2>Error</h2><p>Failed to load menu data. Please try again later.</p>';
        }
    }
}

/**
 * Load services information into the modal
 */
function loadServicesInfo() {
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;
    
    const html = `
        <h2>Our Services</h2>
        <div class="services-grid">
            <div class="service-card">
                <h3>Private Chef Services</h3>
                <p>Personalized culinary experiences in your home or venue, tailored to your preferences and dietary requirements.</p>
            </div>
            <div class="service-card">
                <h3>Event Catering</h3>
                <p>Full-service catering for weddings, corporate events, birthdays, and special occasions.</p>
            </div>
            <div class="service-card">
                <h3>Weekly Meal Service</h3>
                <p>Chef-prepared meals delivered to your door, saving you time and elevating your dining experience.</p>
            </div>
            <div class="service-card">
                <h3>Cooking Classes</h3>
                <p>Interactive cooking sessions with our talented chefs, perfect for team building or special occasions.</p>
            </div>
            <div class="service-card">
                <h3>Menu Development</h3>
                <p>Custom menu creation for your restaurant, cafe, or food business.</p>
            </div>
            <div class="service-card">
                <h3>Consulting</h3>
                <p>Expert advice on kitchen operations, food safety, and culinary trends.</p>
            </div>
        </div>
        <div class="cta-section">
            <p>Ready to experience our services?</p>
            <button class="btn" onclick="openModal('contact')">Contact Us</button>
        </div>
    `;
    
    modalBody.innerHTML = html;
}

/**
 * Load about information into the modal
 */
function loadAboutInfo() {
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;
    
    const html = `
        <h2>About Santa Barbara Chef Collective</h2>
        <div class="about-content">
            <p>Santa Barbara Chef Collective brings together the city's most talented chefs to create unforgettable culinary experiences. Founded in 2020, our mission is to connect food enthusiasts with exceptional local culinary talent.</p>
            
            <h3>Our Story</h3>
            <p>What began as a small network of independent chefs has grown into a thriving collective of culinary professionals dedicated to elevating the Santa Barbara dining scene. Our chefs bring diverse backgrounds, techniques, and flavors to every event.</p>
            
            <h3>Our Values</h3>
            <ul>
                <li><strong>Quality:</strong> We source the finest ingredients and maintain the highest standards in food preparation.</li>
                <li><strong>Sustainability:</strong> We prioritize local, seasonal, and sustainable ingredients whenever possible.</li>
                <li><strong>Community:</strong> We support local farmers, producers, and food artisans.</li>
                <li><strong>Innovation:</strong> We continuously explore new techniques and flavor combinations.</li>
            </ul>
            
            <h3>Our Team</h3>
            <p>Our collective includes award-winning chefs with experience in fine dining, catering, and culinary education. Each chef brings their unique perspective and expertise to our collaborative approach.</p>
        </div>
    `;
    
    modalBody.innerHTML = html;
}

/**
 * Load FAQ content into the modal
 */
async function loadFAQContent() {
    try {
        const modalBody = document.getElementById('modal-body');
        if (!modalBody) return;
        
        // Show loading spinner
        modalBody.innerHTML = '<div class="loading-spinner"></div>';
        
        // Fetch FAQ content
        const data = await fetchFAQContent();
        
        // Generate HTML for FAQ content
        let html = '<h2>Frequently Asked Questions</h2>';
        
        if (data.records && data.records.length > 0) {
            // Group FAQs by category
            const faqsByCategory = {};
            
            data.records.forEach(record => {
                const fields = record.fields;
                const question = fields.Question || 'Question';
                const answer = fields.Answer || 'No answer available';
                const category = fields.Category || 'General';
                
                if (!faqsByCategory[category]) {
                    faqsByCategory[category] = [];
                }
                
                faqsByCategory[category].push({ question, answer });
            });
            
            // Generate HTML for each category
            for (const category in faqsByCategory) {
                html += `<h3>${category}</h3>`;
                html += '<div class="faq-section">';
                
                faqsByCategory[category].forEach(faq => {
                    html += `
                        <div class="faq-item">
                            <div class="faq-question">${faq.question}</div>
                            <div class="faq-answer">${faq.answer}</div>
                        </div>
                    `;
                });
                
                html += '</div>';
            }
        } else {
            html += '<p>No FAQ content available at this time.</p>';
        }
        
        // Update modal content
        modalBody.innerHTML = html;
        
        // Add event listeners for FAQ questions
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                this.classList.toggle('active');
                const answer = this.nextElementSibling;
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    } catch (error) {
        console.error('Error loading FAQ content:', error);
        const modalBody = document.getElementById('modal-body');
        if (modalBody) {
            modalBody.innerHTML = '<h2>Error</h2><p>Failed to load FAQ content. Please try again later.</p>';
        }
    }
}

/**
 * Load contact form into the modal
 */
function loadContactForm() {
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;
    
    const html = `
        <h2>Contact Us</h2>
        <form id="contact-form">
            <div class="form-group">
                <label for="contact-name">Your Name</label>
                <input type="text" id="contact-name" name="name" required>
            </div>
            <div class="form-group">
                <label for="contact-email">Email</label>
                <input type="email" id="contact-email" name="email" required>
            </div>
            <div class="form-group">
                <label for="contact-phone">Phone</label>
                <input type="tel" id="contact-phone" name="phone">
            </div>
            <div class="form-group">
                <label for="contact-subject">Subject</label>
                <select id="contact-subject" name="subject" required>
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Event Planning">Event Planning</option>
                    <option value="Weekly Meals">Weekly Meals</option>
                    <option value="Cooking Classes">Cooking Classes</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="contact-message">Message</label>
                <textarea id="contact-message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn">Send Message</button>
        </form>
    `;
    
    modalBody.innerHTML = html;
    
    // Add event listener for form submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.textContent = 'Sending...';
                    submitButton.disabled = true;
                }
                
                // Collect form data
                const formData = {
                    Name: form.querySelector('#contact-name').value,
                    Email: form.querySelector('#contact-email').value,
                    Phone: form.querySelector('#contact-phone').value,
                    Subject: form.querySelector('#contact-subject').value,
                    Message: form.querySelector('#contact-message').value,
                    'Submission Type': 'Contact Form'
                };
                
                // Submit form to Airtable
                await submitFormToAirtable('contact', formData);
                
                // Show success message
                modalBody.innerHTML = `
                    <h2>Thank You!</h2>
                    <p>Your message has been sent successfully. We'll get back to you soon.</p>
                    <button class="btn" onclick="closeModal()">Close</button>
                `;
            } catch (error) {
                console.error('Error submitting contact form:', error);
                modalBody.innerHTML = `
                    <h2>Error</h2>
                    <p>Failed to send your message. Please try again later.</p>
                    <button class="btn" onclick="closeModal()">Close</button>
                `;
            }
        });
    }
}

// Initialize the Airtable integration
document.addEventListener('DOMContentLoaded', function() {
    console.log('Airtable integration initialized');
}); 