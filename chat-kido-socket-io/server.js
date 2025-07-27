// Import required modules
const express = require('express');             // Express framework for building the server
const { createServer } = require('http');       // Node's native HTTP server
const { Server } = require('socket.io');        // Socket.IO server
const { join } = require('path');               // For handling file paths

const app = express();                          // Initialize Express app
const server = createServer(app);               // Create an HTTP server using Express
const io = new Server(server);                  // Attach Socket.IO to the HTTP server
const PORT = process.env.PORT || 3000;          // Define the port number

// Serve static files (like CSS, JS, images) from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

// Route for root URL - serve the chat HTML file
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Send an initial message to the newly connected client
    socket.emit("messageFromServer", "Hello from the server!");

    // Listen for messages sent by the client
    socket.on('messageFromClient', (message) => {
        console.log('Message from client:', message);
        // Broadcast the message to all other connected clients except the sender
        socket.broadcast.emit('messageFromServer', message);
    });

    // Send a greeting message and handle the client's acknowledgment via callback
    socket.emit('greeting', 'Hey there! welcome to the server!', (response) => {
        console.log('Client has received the response:', response);
    });

    // Optional: Handle disconnection event
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });
});

// Start the server
server.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
