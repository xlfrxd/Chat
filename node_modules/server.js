const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let clients = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New client connected');
    if (clients.length < 2) {
        clients.push(socket);

        socket.on('setUsername', (username) => {
            socket.username = username;
            console.log('Username set to:', username); // Debugging line
        });

        socket.on('message', (message) => {
            console.log('Message received:', message); // Debugging line
            if (socket.username) {
                console.log('Broadcasting message from', socket.username + ':', message); // Debugging line
                clients.forEach((client) => {
                    client.emit('message', { username: socket.username, message });
                });
            } else {
                console.log('Username not set for message:', message); // Debugging line
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected'); // Debugging line
            clients = clients.filter((client) => client !== socket);
        });
    } else {
        socket.emit('full', 'Chatroom is full. Please try again later.');
        socket.disconnect();
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
