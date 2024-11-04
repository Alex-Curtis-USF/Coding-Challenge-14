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


const createTicketHTML = (ticket) => {
    return `
        <div class="ticket">
            <div class="ticket-header">
                <h3>Ticket #${ticket.id}</h3>
                <div>Customer ID: ${ticket.userId}</div>
            </div>
            <div class="ticket-content">
                <h4>${ticket.title}</h4>
                <p>${ticket.body}</p>
            </div>
        </div>
    `;
};

// Task 3 Display Tickets Dynamically on the Page

const displayTickets = (tickets) => {
    const ticketsHTML = tickets.map(ticket => createTicketHTML(ticket)).join('');
    ticketContainer.innerHTML = ticketsHTML;
};

document.head.insertAdjacentHTML('beforeend', `
    <style>
        .ticket {
            background: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 4px;
        }
        .ticket-header {
            border-bottom: 1px solid #eee;
            margin-bottom: 10px;
        }
    </style>
`);

document.addEventListener('DOMContentLoaded', async () => {
    const tickets = await fetchTickets();
    displayTickets(tickets);
});