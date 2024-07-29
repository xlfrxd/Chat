const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('message', (message) => {
    console.log('Received message:', message); // Debugging line
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messagesDiv.appendChild(messageElement);
});

socket.on('full', (message) => {
    console.log('Chatroom full:', message); // Debugging line
    document.getElementById('chat').style.display = 'none';
    document.getElementById('fullMessage').style.display = 'block';
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    messageInput.value = '';
    console.log('Sending message:', message); // Debugging line
    socket.emit('message', message);
}
