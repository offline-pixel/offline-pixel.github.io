// --- IndexedDB Helper Functions ---
const DB_NAME = 'CookieConsentDB';
const DB_VERSION = 1;
const STORE_NAME = 'consent';

let db;

/**
 * Opens or creates an IndexedDB database.
 * @returns {Promise<IDBDatabase>}
 */
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function(event) {
            db = event.target.result;
            // Create an object store if it doesn't exist
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = function(event) {
            console.error("IndexedDB error:", event.target.errorCode);
            reject(event.target.error);
        };
    });
}

/**
 * Stores consent data in IndexedDB.
 * @param {Object} consentData - The consent object to store.
 * @returns {Promise<void>}
 */
function storeConsent(consentData) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        // Store with a fixed ID 'user_consent'
        const request = store.put({ id: 'user_consent', ...consentData });

        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(event.target.error);
    });
}

/**
 * Retrieves consent data from IndexedDB.
 * @returns {Promise<Object|null>}
 */
function getConsent() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get('user_consent');

        request.onsuccess = (event) => resolve(event.target.result || null);
        request.onerror = (event) => reject(event.target.error);
    });
}

// --- Cookie Consent GUI Logic ---
// Get references to HTML elements (these must exist in your HTML file)
const cookieBanner = document.getElementById('cookie-banner');
const preferencesModal = document.getElementById('cookie-preferences-modal');
const acceptBtn = document.getElementById('accept-cookies');
const rejectBtn = document.getElementById('reject-cookies');
const customizeBtn = document.getElementById('customize-cookies');
const savePreferencesBtn = document.getElementById('save-preferences');
const closePreferencesBtn = document.getElementById('close-preferences');
const analyticsCheckbox = document.getElementById('cookie-analytics');
const marketingCheckbox = document.getElementById('cookie-marketing');

// Default consent state (before user interaction or if no consent found)
let currentConsent = {
    status: 'unknown', // 'granted', 'rejected', 'custom', 'unknown'
    preferences: {
        necessary: true,
        analytics: false,
        marketing: false
    }
};

/**
 * Loads scripts based on granted consent categories.
 * @param {Object} preferences - The user's cookie preferences.
 */
function loadScripts(preferences) {
    // Find all script placeholders
    const scriptPlaceholders = document.querySelectorAll('script[data-src][type="text/plain"], script[data-consent-category][type="text/plain"]');

    scriptPlaceholders.forEach(placeholder => {
        const category = placeholder.dataset.consentCategory;
        const src = placeholder.dataset.src;
        const originalId = placeholder.id;
        const originalCrossorigin = placeholder.getAttribute('crossorigin');

        // Check if the category is accepted (or if it's a necessary script which is always true for 'necessary')
        if (preferences[category]) { // Only load if explicitly consented
            const newScript = document.createElement('script');
            if (src) {
                newScript.src = src;
                newScript.async = true; // Make scripts load asynchronously
                if (originalCrossorigin) {
                    newScript.setAttribute('crossorigin', originalCrossorigin);
                }
            } else {
                // For inline scripts (like GA config that doesn't have a src)
                newScript.textContent = placeholder.textContent;
            }
            newScript.type = 'text/javascript'; // Change back to runnable type
            newScript.id = originalId.replace('-placeholder', ''); // Restore original ID if desired

            // Append the script to the head (or body, depending on where it should execute)
            // Head is generally better for tracking scripts like GA, AdSense
            document.head.appendChild(newScript);
        }
        // Remove the placeholder from the DOM after processing
        // This prevents multiple loads if the script runs again for some reason
        placeholder.remove();
    });
}

/**
 * Updates UI and loads/unloads scripts based on consent.
 * @param {Object} consent - The consent object.
 */
function handleConsent(consent) {
    currentConsent = consent;
    hideConsentUI(); // Hide both banner and modal

    // Load scripts based on the updated preferences
    // This is called whether consent is granted, rejected, or custom
    // The loadScripts function itself checks the preferences
    loadScripts(consent.preferences);

    if (consent.status === 'granted') {
        console.log('Cookies accepted. All non-essential scripts loaded.');
    } else if (consent.status === 'rejected') {
        console.log('Cookies rejected. Only necessary scripts loaded.');
    } else if (consent.status === 'custom') {
        console.log('Custom cookie preferences saved. Scripts loaded accordingly.');
    }
}

/**
 * Shows the cookie banner.
 */
function showBanner() {
    if (cookieBanner) {
        cookieBanner.classList.remove('hidden');
    }
}

/**
 * Hides the cookie banner and modal.
 */
function hideConsentUI() {
    if (cookieBanner) {
        cookieBanner.classList.add('hidden');
    }
    if (preferencesModal) {
        preferencesModal.classList.remove('show');
        preferencesModal.classList.add('hidden'); // Ensure it's fully hidden
    }
}

// --- Event Listeners and Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all elements exist before attaching listeners
    if (!cookieBanner || !preferencesModal || !acceptBtn || !rejectBtn || !customizeBtn ||
        !savePreferencesBtn || !closePreferencesBtn || !analyticsCheckbox || !marketingCheckbox) {
        console.error("Cookie consent UI elements not found. Please ensure all required IDs are in your HTML.");
        return; // Exit if elements are missing
    }

    acceptBtn.addEventListener('click', () => {
        const consentData = {
            status: 'granted',
            preferences: {
                necessary: true,
                analytics: true,
                marketing: true
            },
            timestamp: Date.now()
        };
        storeConsent(consentData).then(() => handleConsent(consentData));
    });

    rejectBtn.addEventListener('click', () => {
        const consentData = {
            status: 'rejected',
            preferences: {
                necessary: true,
                analytics: false,
                marketing: false
            },
            timestamp: Date.now()
        };
        storeConsent(consentData).then(() => handleConsent(consentData));
    });

    customizeBtn.addEventListener('click', () => {
        preferencesModal.classList.remove('hidden');
        preferencesModal.classList.add('show');
        cookieBanner.classList.add('hidden'); // Hide banner when modal is open
        // Set checkbox states based on currentConsent or defaults
        analyticsCheckbox.checked = currentConsent.preferences.analytics;
        marketingCheckbox.checked = currentConsent.preferences.marketing;
    });

    closePreferencesBtn.addEventListener('click', () => {
        // If user closes modal without saving, assume no change to *current* state
        // If consent was previously unknown, re-show banner.
        if (currentConsent.status === 'unknown') {
            showBanner();
        }
        hideConsentUI();
    });

    savePreferencesBtn.addEventListener('click', () => {
        const consentData = {
            status: 'custom',
            preferences: {
                necessary: true,
                analytics: analyticsCheckbox.checked,
                marketing: marketingCheckbox.checked
            },
            timestamp: Date.now()
        };
        storeConsent(consentData).then(() => handleConsent(consentData));
    });

    // Initial check for consent on page load
    openDB().then(() => {
        getConsent().then(storedConsent => {
            if (storedConsent) {
                console.log('Previous consent found:', storedConsent);
                handleConsent(storedConsent);
            } else {
                console.log('No previous consent. Showing banner.');
                // Only show banner if no previous consent and IndexedDB is working
                showBanner();
            }
        });
    }).catch(error => {
        console.error("Failed to initialize IndexedDB:", error);
        // Fallback: If IndexedDB fails, still show banner and prompt user.
        // Consent will not be persistently stored, but scripts will still load on acceptance for current session.
        showBanner();
    });
});
