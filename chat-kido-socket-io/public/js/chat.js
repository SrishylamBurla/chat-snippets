// Initialize the Socket.IO client
const socket = io();

// Get DOM elements for sending and displaying messages
const sendButton = document.querySelector('.send-button');
const messageArea = document.querySelector('#messageArea');
const messageInput = document.querySelector('#input');

// Function to display a message in the chat area
function addMessage(message, sender) {
    const messageDiv = document.createElement('div'); // Create a new message div
    messageDiv.classList = `message ${sender}-message`; // Assign class based on sender (e.g., 'client-message' or 'server-message')
    messageDiv.textContent = message; // Set the message text
    messageArea.appendChild(messageDiv); // Add the message to the message area
    messageArea.scrollTop = messageArea.scrollHeight; // Scroll to the bottom to show the latest message
}

// Listen for messages from the server
socket.on('messageFromServer', (message) => {
    console.log('Message from server:', message);
    addMessage(message, 'server'); // Add the server message to the chat
});

// Handle message sending on form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const message = messageInput.value; // Get the message from input
    if (message) {
        addMessage(message, 'client'); // Add the client message to the chat
        socket.emit('messageFromClient', message); // Send the message to the server
        messageInput.value = ''; // Clear the input field
        messageInput.focus(); // Focus the input for next message
    }
});

// Listen for a custom 'greeting' event from the server
socket.on('greeting', (message, callback) => {
    console.log('Greeting from server:', message);
    addMessage(message, 'server'); // Display the greeting message
    callback({
        status: 'received',
        message: 'Greeting acknowledged',
        timestamp: new Date().toISOString()
    }); // Send acknowledgment back to server
});
