let username = '';

const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('message', (data) => {
    console.log('Received message:', data); // Debugging line
    addMessage(data.username, data.message);
});

socket.on('full', (message) => {
    console.log('Chatroom full:', message); // Debugging line
    document.getElementById('login').style.display = 'none';
    document.getElementById('chat').style.display = 'none';
    document.getElementById('fullMessage').style.display = 'block';
});

function setUsername() {
    const usernameInput = document.getElementById('usernameInput');
    username = usernameInput.value.trim();
    if (username !== '') {
        console.log('Setting username:', username); // Debugging line
        socket.emit('setUsername', username);
        document.getElementById('login').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
    } else {
        alert('Please enter a valid name.');
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message !== '' && username !== '') {
        console.log('Sending message from', username + ':', message); // Debugging line
        messageInput.value = '';
        socket.emit('message', {username, message});
        addMessage(username, message); // Add the sender's message to the chat
    } else {
        alert('Please set your username and enter a message.');
    }
}

function addMessage(sender, message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span>${sender}</span>: ${message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
