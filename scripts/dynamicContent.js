document.addEventListener('DOMContentLoaded', function() {
    // --- Dynamic Date Posted Logic ---
    const dynamicDateElement = document.getElementById('dynamicDatePosted');
    const jobPostingSchema = document.getElementById('jobPostingSchema');

    // Define the key for sessionStorage
    const SESSION_DATE_KEY = 'jobPostedDate';
    const SESSION_DATE_DISPLAY_KEY = 'jobPostedDateDisplay';

    if (dynamicDateElement) {
        let postedDate;
        let displayString;

        // Try to get the date from session storage
        const storedDateISO = sessionStorage.getItem(SESSION_DATE_KEY);
        const storedDisplayString = sessionStorage.getItem(SESSION_DATE_DISPLAY_KEY);

        if (storedDateISO && storedDisplayString) {
            // Use the stored date and display string
            postedDate = new Date(storedDateISO);
            displayString = storedDisplayString;
        } else {
            // Calculate a new random date if not found in session storage
            const now = new Date();
            let randomTimeOffset; // in milliseconds

            // Generate a random number to decide if it's minutes or days ago
            const typeOfAgo = Math.random();

            if (typeOfAgo < 0.33) { // 1-60 minutes ago
                randomTimeOffset = Math.random() * 60 * 60 * 1000; // up to 60 minutes
            } else if (typeOfAgo < 0.66) { // 1-24 hours ago (1 day)
                randomTimeOffset = Math.random() * 24 * 60 * 60 * 1000; // up to 24 hours
            } else { // 1-3 days ago
                randomTimeOffset = Math.random() * 3 * 24 * 60 * 60 * 1000; // up to 3 days
            }

            postedDate = new Date(now.getTime() - randomTimeOffset);

            // Format for display (e.g., "3 days ago", "2 hours ago", "15 minutes ago")
            const diffMs = now.getTime() - postedDate.getTime();
            const diffSeconds = Math.round(diffMs / 1000);
            const diffMinutes = Math.round(diffSeconds / 60);
            const diffHours = Math.round(diffMinutes / 60);
            const diffDays = Math.round(diffHours / 24);

            if (diffMinutes < 1) {
                displayString = "just now";
            } else if (diffMinutes < 60) {
                displayString = `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
            } else if (diffHours < 24) {
                displayString = `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
            } else {
                displayString = `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
            }

            // Store the generated date and display string in session storage
            sessionStorage.setItem(SESSION_DATE_KEY, postedDate.toISOString());
            sessionStorage.setItem(SESSION_DATE_DISPLAY_KEY, displayString);
        }
        
        dynamicDateElement.textContent = displayString;

        // Update JSON-LD with the (new or stored) date
        const schemaData = JSON.parse(jobPostingSchema.textContent);
        schemaData.datePosted = postedDate.toISOString().split('T')[0]; // YYYY-MM-DD format
        jobPostingSchema.textContent = JSON.stringify(schemaData, null, 2);
    }
    // --- End Dynamic Date Posted Logic ---

    // --- Dynamic Compensation Table Logic ---
    const dealValueHeader = document.getElementById('dealValueHeader');
    const agentCommissionElement = document.getElementById('agentCommission');
    const technicalExecutionElement = document.getElementById('technicalExecution');
    const clientSuccessElement = document.getElementById('clientSuccess');
    const businessOperationsElement = document.getElementById('businessOperations');
    const companyProfitElement = document.getElementById('companyProfit');

    // Define the key for sessionStorage for the deal value
    const SESSION_DEAL_VALUE_KEY = 'jobDealValue';

    if (dealValueHeader) {
        let randomDealValue;

        // Try to get the deal value from session storage
        const storedDealValue = sessionStorage.getItem(SESSION_DEAL_VALUE_KEY);

        if (storedDealValue) {
            randomDealValue = parseInt(storedDealValue, 10);
        } else {
            // Generate a new random deal value if not found in session storage
            const minDeal = 5000;
            const maxDeal = 100000;
            const step = 1000;
            randomDealValue = Math.floor(Math.random() * ((maxDeal - minDeal) / step + 1)) * step + minDeal;
            
            // Store the generated deal value in session storage
            sessionStorage.setItem(SESSION_DEAL_VALUE_KEY, randomDealValue.toString());
        }

        // Update the header
        dealValueHeader.textContent = `$${randomDealValue.toLocaleString()} Example Deal`;

        // Calculate and update values based on percentages
        const agentCommission = randomDealValue * 0.10; // 10%
        const technicalExecution = randomDealValue * 0.475; // 47.5%
        const clientSuccess = randomDealValue * 0.20; // 20%
        const businessOperations = randomDealValue * 0.10; // 10%
        const companyProfit = randomDealValue * 0.125; // 12.5%

        agentCommissionElement.textContent = `$${agentCommission.toLocaleString()}`;
        technicalExecutionElement.textContent = `$${technicalExecution.toLocaleString()}`;
        clientSuccessElement.textContent = `$${clientSuccess.toLocaleString()}`;
        businessOperationsElement.textContent = `$${businessOperations.toLocaleString()}`;
        companyProfitElement.textContent = `$${companyProfit.toLocaleString()}`;
    }
    // --- End Dynamic Compensation Table Logic ---
});