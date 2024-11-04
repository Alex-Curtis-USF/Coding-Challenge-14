// Task 2 Fetch Tickets Using Async/Await and Handle Errors
class NoTicketsError extends Error {
    constructor() {
        super('No unresolved tickets available');
    }
}

const errorMessage = document.getElementById('errorMessage');
const ticketContainer = document.getElementById('ticketContainer');

const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
};

const hideError = () => {
    errorMessage.style.display = 'none';
};

const fetchTickets = async () => {
    try {
        hideError();
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.length === 0) {
            throw new NoTicketsError();
        }

        return data;

    } catch (error) {
        showError(error.message);
        return [];
    }
};

