/**
 * Airtable Integration for Santa Barbara Chef Collective
 * This file contains functions to interact with Airtable API
 */

// Debug mode to help with testing
const DEBUG_MODE = true;

// Airtable API Configuration
const AIRTABLE_CONFIG = {
    apiKey: 'patB9mf7fYhSz3PE1.82f3cb61bbb77745b641292d1ebcdc114b585d7cdce8306299a719c12ee829ac',
    baseId: 'appOWFyYIGbLoKalt',
    tables: {
        chefs: 'Chefs',
        menus: 'Menus',
        faq: 'FAQ',
        contact: 'Contact Submissions'
    },
    rateLimit: {
        requestsPerSecond: 1,     // Reduced to 1 request per second
        lastRequest: 0,
        minInterval: 1000,        // 1000ms between requests
        backoffMultiplier: 2,     // Increased backoff
        maxRetries: 2,           // Reduced retries
        burstLimit: 2,           // Reduced burst limit
        burstInterval: 60000     // Reset burst window every minute
    }
};

// Enhanced cache configuration with longer durations
const CACHE_CONFIG = {
    expiration: 24 * 60 * 60 * 1000,  // 24 hours default
    shortExpiration: 12 * 60 * 60 * 1000,  // 12 hours for frequently changing data
    longExpiration: 7 * 24 * 60 * 60 * 1000   // 7 days for static data
};

// Cache for storing fetched data
const dataCache = {
    chefs: null,
    menus: null,
    faq: null,
    lastUpdated: {},
    pendingRequests: {}
};

// Request burst tracking with reduced frequency
let requestBurst = {
    count: 0,
    lastReset: Date.now(),
    maxRequests: 3 // Reduced from 5
};

// Queue for managing API requests
const requestQueue = [];
let isProcessingQueue = false;

// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG_MODE) {
        console.log(`[Airtable Debug] ${message}`);
        if (data) {
            console.log(data);
        }
    }
}

// Add request to queue with deduplication
async function queueRequest(request, cacheKey) {
    // Check if there's already a pending request for this cache key
    if (cacheKey && dataCache.pendingRequests[cacheKey]) {
        return dataCache.pendingRequests[cacheKey];
    }

    const promise = new Promise((resolve, reject) => {
        requestQueue.push({ request, resolve, reject, cacheKey });
        if (cacheKey) {
            dataCache.pendingRequests[cacheKey] = promise;
        }
        processQueue();
    });

    return promise;
}

// Process queue with improved batching
async function processQueue() {
    if (isProcessingQueue || requestQueue.length === 0) return;
    isProcessingQueue = true;

    try {
        // Process requests in smaller batches
        const batchSize = 2; // Process 2 requests at a time
        while (requestQueue.length > 0 && canProcessRequest()) {
            const batch = requestQueue.splice(0, batchSize);
            
            await Promise.all(batch.map(async ({ request, resolve, reject, cacheKey }) => {
                try {
                    const result = await request();
                    resolve(result);
                    requestBurst.count++;
                    
                    // Clear pending request tracker
                    if (cacheKey) {
                        delete dataCache.pendingRequests[cacheKey];
                    }
                } catch (error) {
                    if (error.status === 429) {
                        requestQueue.unshift({ request, resolve, reject, cacheKey });
                        await handleRateLimit();
                    } else {
                        reject(error);
                        if (cacheKey) {
                            delete dataCache.pendingRequests[cacheKey];
                        }
                    }
                }
            }));

            // Add delay between batches
            if (requestQueue.length > 0) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between batches
            }
        }
    } catch (error) {
        console.error('Error processing queue:', error);
    } finally {
        isProcessingQueue = false;
        if (requestQueue.length > 0) {
            setTimeout(processQueue, AIRTABLE_CONFIG.rateLimit.minInterval);
        }
    }
}

// Check if we can process more requests
function canProcessRequest() {
    const now = Date.now();
    
    // Reset burst counter if window has passed
    if (now - requestBurst.lastReset >= AIRTABLE_CONFIG.rateLimit.burstInterval) {
        requestBurst.count = 0;
        requestBurst.lastReset = now;
    }

    return requestBurst.count < AIRTABLE_CONFIG.rateLimit.burstLimit;
}

// Handle rate limit errors
async function handleRateLimit() {
    const backoffTime = AIRTABLE_CONFIG.rateLimit.minInterval * 2;
    console.warn(`Rate limit hit, backing off for ${backoffTime}ms`);
    await new Promise(resolve => setTimeout(resolve, backoffTime));
    requestBurst.count = 0; // Reset burst counter
}

// Enhanced cache management
function getCacheExpiration(tableName) {
    switch (tableName) {
        case 'chefs':
        case 'menus':
            return CACHE_CONFIG.shortExpiration;
        case 'faq':
            return CACHE_CONFIG.longExpiration;
        default:
            return CACHE_CONFIG.expiration;
    }
}

// Modified fetchFromAirtable function with debug logging
async function fetchFromAirtable(tableName, view = 'Grid view', fields = []) {
    const cacheKey = `${tableName}-${view}-${fields.join(',')}`;
    debugLog(`Attempting to fetch from table: ${tableName}`);
    
    // Check cache first
    const now = Date.now();
    const cacheExpiration = getCacheExpiration(tableName);
    
    if (dataCache[tableName] && dataCache.lastUpdated[tableName] && 
        (now - dataCache.lastUpdated[tableName] < cacheExpiration)) {
        debugLog(`Using cached data for ${tableName}`);
        return dataCache[tableName];
    }

    debugLog(`Cache miss for ${tableName}, fetching from Airtable`);

    return queueRequest(async () => {
        try {
            const baseUrl = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${encodeURIComponent(AIRTABLE_CONFIG.tables[tableName])}`;
            const params = new URLSearchParams();
            if (view) params.append('view', view);
            if (fields && fields.length > 0) {
                fields.forEach(field => params.append('fields[]', field));
            }
            
            const url = `${baseUrl}?${params.toString()}`;
            debugLog(`Making API request to: ${url}`);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                debugLog(`API Error Response:`, {
                    status: response.status,
                    statusText: response.statusText,
                    errorText: errorText
                });
                throw new Error(`Airtable API error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            debugLog(`Successful response for ${tableName}`, {
                recordCount: data.records ? data.records.length : 0
            });
            
            // Update cache
            dataCache[tableName] = data;
            dataCache.lastUpdated[tableName] = now;
            
            return data;
        } catch (error) {
            debugLog(`Error in fetchFromAirtable:`, error);
            throw error;
        }
    }, cacheKey);
}

/**
 * Fetch chef profiles from Airtable
 * @returns {Promise} - Promise with the chef profiles
 */
window.fetchChefProfiles = async function() {
    try {
        console.log('Fetching chef profiles...');
        const data = await fetchFromAirtable('chefs', 'Grid view', [
            'Name',
            'Specialty',
            'Bio',
            'Image',
            'Status'
        ]);

        if (!data.records || data.records.length === 0) {
            console.warn('No chef records found');
            return [];
        }

        return data.records
            .filter(record => record.fields && record.fields['Status'] !== 'inactive')
            .map(record => ({
                id: record.id,
                name: record.fields['Name'] || 'Unnamed Chef',
                specialty: record.fields['Specialty'] || '',
                bio: record.fields['Bio'] || '',
                image: record.fields['Image'] ? record.fields['Image'][0].url : null,
                status: record.fields['Status'] || 'active'
            }));
    } catch (error) {
        console.error('Error in fetchChefProfiles:', error);
        return [];
    }
};

/**
 * Fetch menu data from Airtable
 * @returns {Promise} - Promise with the menu data
 */
window.fetchMenuData = async function() {
    try {
        console.log('Fetching menu data...');
        const data = await fetchFromAirtable('menus', 'Grid view', [
            'Menu Number',
            'Menu Name',
            'Menu Description',
            'Menu Type',
            'Menu Color',
            'Status'
        ]);

        if (!data.records || data.records.length === 0) {
            console.warn('No menu records found');
            return [];
        }

        return data.records
            .filter(record => record.fields && record.fields['Status'] !== 'inactive')
            .map(record => ({
                id: record.id,
                name: record.fields['Menu Name'] || 'Untitled Menu',
                description: record.fields['Menu Description'] || '',
                type: record.fields['Menu Type'] || '',
                color: record.fields['Menu Color'] || '',
                menuNumber: record.fields['Menu Number'] || ''
            }));
    } catch (error) {
        console.error('Error in fetchMenuData:', error);
        return [];
    }
};

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
                const name = fields['Name'] || 'Chef';
                const bio = fields['Bio'] || 'No description available';
                const style = fields['Specialty'] || '';
                const photoUrl = fields['Image'] && Array.isArray(fields['Image']) && fields['Image'].length > 0 ? fields['Image'][0].url : './SBCC-Images/saucing-salmon.jpg';
                // Fallback placeholder
                const placeholder = './SBCC-Images/saucing-salmon.jpg';
                html += `
                    <div class="chef-card">
                        <div class="chef-image">
                            <img src="${photoUrl || placeholder}" alt="${name}" onerror="this.src='${placeholder}'">
                        </div>
                        <div class="chef-info">
                            <h3>${name}</h3>
                            <p>${bio}</p>
                            ${style ? `<p class='chef-style'><strong>Style:</strong> ${style}</p>` : ''}
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
        <h2>Signature Meal Program</h2>
        <div class="accordion-container">
            <div class="accordion-item">
                <div class="accordion-header" aria-expanded="false">
                    <h3>Program Overview</h3>
                    <span class="accordion-arrow"></span>
        </div>
                <div class="accordion-content">
                    <p class="program-description">Transform your everyday dining with chef-crafted meals delivered to your home on a schedule that suits your lifestyle. Our Signature Meal Program brings the expertise of Santa Barbara's finest culinary artists to your family table without the planning, shopping, or preparation.</p>
                    
                    <div class="program-features">
                        <div class="feature">
                            <h4>Personalized Menus</h4>
                            <p>Tailored to your household's preferences, dietary needs, and schedule.</p>
                        </div>
                        
                        <div class="feature">
                            <h4>Seasonal Ingredients</h4>
                            <p>Fresh, locally-sourced produce and premium ingredients that change with the seasons.</p>
                        </div>
                        
                        <div class="feature">
                            <h4>Flexible Scheduling</h4>
                            <p>Choose from 2, 3, or 5 meals per week with easy adjustments as your needs change.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="accordion-item">
                <div class="accordion-header" aria-expanded="false">
                    <h3>Dietary Options</h3>
                    <span class="accordion-arrow"></span>
                </div>
                <div class="accordion-content">
                    <div class="dietary-options">
                        <h4>Accommodating Your Dietary Preferences</h4>
                        <p>Our chefs are skilled in preparing delicious meals for various dietary needs, including:</p>
                        <ul class="diet-list">
                            <li><span class="diet-tag">Gluten-Free</span></li>
                            <li><span class="diet-tag">Dairy-Free</span></li>
                            <li><span class="diet-tag">Vegan</span></li>
                            <li><span class="diet-tag">Vegetarian</span></li>
                            <li><span class="diet-tag">Paleo</span></li>
                            <li><span class="diet-tag">Keto</span></li>
                            <li><span class="diet-tag">Low-FODMAP</span></li>
                            <li><span class="diet-tag">Mediterranean</span></li>
            </ul>
                        <p class="diet-note">Each dish is clearly labeled with allergens and dietary compliance for your peace of mind.</p>
        </div>
                </div>
            </div>

            <div class="accordion-item">
                <div class="accordion-header" aria-expanded="false">
                    <h3>How It Works</h3>
                    <span class="accordion-arrow"></span>
                </div>
                <div class="accordion-content">
                    <p class="program-note">Each meal arrives ready to heat and serve, with chef's notes on presentation and optional finishing touches.</p>
                    <div class="program-steps">
                        <div class="step">
                            <h4>1. Design Your Program</h4>
                            <p>Choose your meal frequency, dietary preferences, and portion sizes.</p>
                        </div>
                        <div class="step">
                            <h4>2. Weekly Menu Selection</h4>
                            <p>Review and customize your upcoming meals from our seasonal offerings.</p>
                        </div>
                        <div class="step">
                            <h4>3. Convenient Delivery</h4>
                            <p>Receive your chef-prepared meals on your scheduled delivery day.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="program-cta">
            <button class="cta-button secondary" data-modal="meal-program">Design Your Program</button>
        </div>
    `;
    
    modalBody.innerHTML = html;
    
    // Initialize accordions after content is loaded
    if (typeof reinitializeAccordions === 'function') {
        reinitializeAccordions();
    }
}

/**
 * Load menu data into the modal
 */
async function loadMenuData() {
    try {
        // First find the Our Menus section
        const menuAccordion = Array.from(document.querySelectorAll('#explore-modal .accordion-item'))
            .find(item => item.querySelector('h3')?.textContent.includes('Our Menus'));
        
        if (!menuAccordion) {
            console.warn('Menu accordion section not found');
            return;
        }

        const menuContent = menuAccordion.querySelector('.accordion-content');
        if (!menuContent) {
            console.warn('Menu content area not found');
            return;
        }

        menuContent.innerHTML = '<div class="loading-indicator">Loading menu information...</div>';
        
        const menuData = await fetchMenuData();
        console.log('Received menu data:', menuData);

        if (!menuData || menuData.length === 0) {
            menuContent.innerHTML = '<p>No menu information available at this time.</p>';
            return;
        }

        // Start with the intro text
        let html = `
            <div class="section-intro">
                <p>Experience our diverse range of house menus, crafted with seasonal ingredients and inspired by global cuisines.</p>
                        </div>
            <div class="menus-grid">
        `;

        // Add each menu
        for (const menu of menuData) {
            if (menu.name) {
                html += `
                    <div class="menu-item" data-menu-number="${menu.id}">
                        <div class="menu-info">
                            <h4>${menu.name}</h4>
                            ${menu.description ? `<p class="menu-description">${menu.description}</p>` : ''}
                            
                            <div class="menu-dishes">
                                ${Object.entries(menu.dishes).map(([courseType, dishes]) => `
                                    <div class="course-section">
                                        <h5>${courseType}</h5>
                                        <ul class="dish-list">
                                            ${dishes.map(dish => `
                                                <li class="dish-item">
                                                    <div class="dish-header">
                                                        <span class="dish-name">${dish.name}</span>
                                                        ${dish.price ? `<span class="dish-price">${dish.price}</span>` : ''}
                                                    </div>
                                                    ${dish.description ? `<p class="dish-description">${dish.description}</p>` : ''}
                                                    ${dish.dietaryNotes ? `<span class="dietary-notes">${dish.dietaryNotes}</span>` : ''}
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        html += '</div>'; // Close menus-grid
        menuContent.innerHTML = html;

        // Make sure the accordion is open and stays open
        const header = menuAccordion.querySelector('.accordion-header');
        if (header) {
            header.setAttribute('aria-expanded', 'true');
            menuContent.style.display = 'block';
            menuContent.style.maxHeight = 'none';
            menuContent.style.opacity = '1';
            menuAccordion.classList.add('active');
        }

    } catch (error) {
        console.error('Error displaying menu data:', error);
        const menuContent = document.querySelector('#explore-modal .accordion-content');
        if (menuContent) {
            menuContent.innerHTML = '<p>Unable to load menu information. Please try again later.</p>';
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

// Function to fetch all menus from Airtable
function fetchMenus() {
  return new Promise((resolve, reject) => {
    const menus = [];
    
    fetch(`https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${AIRTABLE_CONFIG.tables.menus}`, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        data.records.forEach(record => {
          menus.push({
            id: record.id,
            name: record.fields.Name,
            description: record.fields.Description,
            category: record.fields.Category,
            colorCode: record.fields.ColorCode,
            dishes: record.fields.Dishes || [],
            minimumSelections: record.fields.MinimumSelections || 0,
            priceRange: record.fields.PriceRange,
            imageUrl: record.fields.ImageURL
          });
        });
        resolve(menus);
      })
      .catch(error => {
        console.error('Error fetching menus:', error);
        reject(error);
      });
  });
}

// Function to render menus as accordions
function renderMenuAccordions(menus) {
  const menuContainer = document.getElementById('menu-accordions');
  if (!menuContainer) {
    console.error('Menu container not found');
    return;
  }
  
  menuContainer.innerHTML = '';
  
  menus.forEach(menu => {
    const accordionItem = document.createElement('div');
    accordionItem.className = 'accordion-item';
    accordionItem.dataset.menuId = menu.id;
    
    const headerStyles = `border-left: 4px solid ${menu.colorCode || '#4A5D23'};`;
    
    const accordionHeader = document.createElement('div');
    accordionHeader.className = 'accordion-header';
    accordionHeader.setAttribute('aria-expanded', 'false');
    accordionHeader.setAttribute('style', headerStyles);
    
    const heading = document.createElement('h3');
    heading.textContent = menu.name;
    
    const icon = document.createElement('span');
    icon.className = 'accordion-icon';
    
    accordionHeader.appendChild(heading);
    accordionHeader.appendChild(icon);
    
    const accordionContent = document.createElement('div');
    accordionContent.className = 'accordion-content';
    
    const description = document.createElement('p');
    description.className = 'menu-description';
    description.textContent = menu.description;
    accordionContent.appendChild(description);
    
    if (menu.dishes && menu.dishes.length > 0) {
      const dishesContainer = document.createElement('div');
      dishesContainer.className = 'dishes-container';
      
      const dishesByCategory = groupDishesByCategory(menu.dishes);
      
      Object.keys(dishesByCategory).forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'dish-category';
        
        const categoryHeading = document.createElement('h4');
        categoryHeading.textContent = category;
        categoryContainer.appendChild(categoryHeading);
        
        dishesByCategory[category].forEach(dish => {
          const dishItem = document.createElement('div');
          dishItem.className = 'dish-item';
          
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = `dish-${dish.id}`;
          checkbox.dataset.dishId = dish.id;
          checkbox.dataset.price = dish.price;
          
          const label = document.createElement('label');
          label.htmlFor = `dish-${dish.id}`;
          label.innerHTML = `
            <span class="dish-name">${dish.name}</span>
            <span class="dish-description">${dish.description}</span>
          `;
          
          if (dish.dietary) {
            const dietaryInfo = document.createElement('span');
            dietaryInfo.className = 'dietary-info';
            dietaryInfo.textContent = dish.dietary;
            label.appendChild(dietaryInfo);
          }
          
          dishItem.appendChild(checkbox);
          dishItem.appendChild(label);
          categoryContainer.appendChild(dishItem);
        });
        
        dishesContainer.appendChild(categoryContainer);
      });
      
      accordionContent.appendChild(dishesContainer);
      
      if (menu.minimumSelections > 0) {
        const minimumNote = document.createElement('p');
        minimumNote.className = 'minimum-note';
        minimumNote.textContent = `Please select at least ${menu.minimumSelections} items from this menu.`;
        accordionContent.appendChild(minimumNote);
      }
    }
    
    if (menu.priceRange) {
      const priceInfo = document.createElement('p');
      priceInfo.className = 'price-info';
      priceInfo.textContent = `Price range: ${menu.priceRange}`;
      accordionContent.appendChild(priceInfo);
    }
    
    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionContent);
    menuContainer.appendChild(accordionItem);
  });
  
  initializeAccordions();
}

// Helper function to group dishes by category
function groupDishesByCategory(dishes) {
  return dishes.reduce((groups, dish) => {
    const category = dish.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(dish);
    return groups;
  }, {});
}

// Initialize the menu page
async function initMenuPage() {
  try {
    const menuContainer = document.getElementById('menu-accordions');
    if (!menuContainer) {
      console.error('Menu container not found');
      return;
    }
    
    menuContainer.innerHTML = '<div class="loading">Loading menus...</div>';
    
    const menus = await fetchMenus();
    renderMenuAccordions(menus);
    initializeRunningTotal();
    
  } catch (error) {
    console.error('Failed to initialize menu page:', error);
    const menuContainer = document.getElementById('menu-accordions');
    if (menuContainer) {
      menuContainer.innerHTML = '<div class="error">Failed to load menus. Please try again later.</div>';
    }
  }
}

// Initialize accordions functionality
function initializeAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      accordionItem.classList.toggle('open');
      header.setAttribute('aria-expanded', accordionItem.classList.contains('open'));
    });
  });
}

// Initialize running total calculation
function initializeRunningTotal() {
  const checkboxes = document.querySelectorAll('.dish-item input[type="checkbox"]');
  const totalElement = document.getElementById('running-total');
  
  if (!totalElement) return;
  
  let total = 0;
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const price = parseFloat(checkbox.dataset.price) || 0;
      total += checkbox.checked ? price : -price;
      totalElement.textContent = `$${total.toFixed(2)}`;
    });
  });
}

// Update loadChefData to handle the correct field names
async function loadChefData() {
    try {
        // First find the Meet the Chefs section
        const chefAccordion = Array.from(document.querySelectorAll('#explore-modal .accordion-item'))
            .find(item => item.querySelector('h3')?.textContent.includes('Meet the Chefs'));
        
        if (!chefAccordion) {
            console.warn('Chef accordion section not found');
            return;
        }

        const chefContent = chefAccordion.querySelector('.accordion-content');
        if (!chefContent) {
            console.warn('Chef content area not found');
            return;
        }

        chefContent.innerHTML = '<div class="loading-indicator">Loading chef information...</div>';
        
        const chefData = await fetchChefProfiles();
        console.log('Received chef data:', chefData);

        if (!chefData || chefData.length === 0) {
            chefContent.innerHTML = '<p>No chef profiles available at this time.</p>';
            return;
        }

        // Start with the intro text
        let html = `
            <div class="section-intro">
                <p>Our collective brings together Santa Barbara's most talented culinary artists, each bringing their unique expertise and passion to your table.</p>
            </div>
            <div class="chefs-grid">
        `;

        // Add each chef
        for (const chef of chefData) {
            if (chef.name) {  // Only display if we have at least a name
                // Ensure image path starts with SBCC-Images
                const imagePath = chef.image ? 
                    (chef.image.startsWith('./SBCC-Images') ? chef.image : './SBCC-Images/' + chef.image.split('/').pop()) :
                    './SBCC-Images/saucing-salmon.jpg';
                
                html += `
                    <div class="chef-card" data-chef-id="${chef.id || ''}">
                        <div class="chef-preview">
                            <div class="chef-image">
                                <img src="${imagePath}" 
                                     alt="${chef.name}" 
                                     onerror="this.src='./SBCC-Images/saucing-salmon.jpg'">
                            </div>
                            <h4>${chef.name}</h4>
                        </div>
                        <div class="chef-details">
                            ${chef.specialty ? `<p class="chef-specialty">${chef.specialty}</p>` : ''}
                            ${chef.bio ? `<p class="chef-bio">${chef.bio}</p>` : ''}
                        </div>
                    </div>
                `;
            }
        }

        html += '</div>'; // Close chefs-grid
        chefContent.innerHTML = html;

        // Add click handlers for expansion
        const chefCards = chefContent.querySelectorAll('.chef-card');
        let currentlyExpanded = null;

        chefCards.forEach(card => {
            card.addEventListener('click', () => {
                // If there's already an expanded card and it's not this one, collapse it
                if (currentlyExpanded && currentlyExpanded !== card) {
                    currentlyExpanded.classList.remove('expanded');
                }

                // Toggle this card
                card.classList.toggle('expanded');
                
                // Update the currently expanded card reference
                currentlyExpanded = card.classList.contains('expanded') ? card : null;

                // Ensure the accordion content height is updated
                const accordionContent = chefAccordion.querySelector('.accordion-content');
                if (accordionContent) {
                    accordionContent.style.maxHeight = 'none';
                }
            });
        });

        // Make sure the accordion is open
        const header = chefAccordion.querySelector('.accordion-header');
        if (header) {
            header.setAttribute('aria-expanded', 'true');
            chefContent.style.display = 'block';
            chefContent.style.maxHeight = 'none';
        }

    } catch (error) {
        console.error('Error displaying chef data:', error);
        const chefContent = document.querySelector('#explore-modal .accordion-content');
        if (chefContent) {
            chefContent.innerHTML = '<p>Unable to load chef information. Please try again later.</p>';
        }
    }
}

// Initialize event listeners for accordion sections
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('explore-modal');
    if (!modal) return;

    // Find all accordion headers in the modal
    const accordionHeaders = modal.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', async (e) => {
            e.preventDefault();
            const accordionItem = header.closest('.accordion-item');
            if (!accordionItem) return;

            const content = accordionItem.querySelector('.accordion-content');
            if (!content) return;

            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Toggle the expanded state
            header.setAttribute('aria-expanded', !isExpanded);
            content.style.display = !isExpanded ? 'block' : 'none';
            
            // If expanding and it's a data section, load the content
            if (!isExpanded) {
                const sectionTitle = header.querySelector('h3')?.textContent.trim().toLowerCase() || '';
                
                if (sectionTitle.includes('chef')) {
                    await loadChefData();
                } else if (sectionTitle.includes('menu')) {
                    await loadMenuData();
                }
            }
        });
    });
});

// Initialize modal functionality
function initializeModal() {
    const modal = document.getElementById('explore-modal');
    if (!modal) return;

    // Close button functionality
    const closeBtn = modal.querySelector('.close-button');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeModal); 