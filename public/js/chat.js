const form = document.querySelector('form');
const chat = document.querySelector('#chat');
const input = document.querySelector('.input');
const messages = document.querySelector('.messages');

const socket = io();
const { userId, username } = chat.dataset;
socket.auth = { userId, username };

const sendMessage = (event) => {
  event.preventDefault();

  addMessage(username + ': ' + input.value);

  socket.emit('chatMessage', {
    message: input.value,
  });

  input.value = '';
  return false;
};

const addMessage = (message) => {
  const li = document.createElement('li');
  li.innerHTML = message;
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
};

socket.on('chatMessage', function (data) {
  addMessage(data.username + ': ' + data.message);
});

socket.on('userJoin', function (data) {
  addMessage(data.username + ' just joined the chat!');
});

socket.on('userLeave', function (data) {
  addMessage('The other user has left the chat.');
});

addMessage("You have joined the chat as '" + username + "'.");
socket.emit('userJoin', { username, userId });

form.addEventListener('submit', sendMessage, false);
