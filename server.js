const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let clients = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
    if (clients.length < 2) {
        clients.push(socket);

        socket.on('message', (message) => {
            clients.forEach((client) => {
                if (client !== socket) {
                    client.emit('message', message);
                }
            });
        });

        socket.on('disconnect', () => {
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
 