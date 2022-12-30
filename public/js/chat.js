const form = document.querySelector('form');
const chat = document.querySelector('#chat');
const input = document.querySelector('.input');
const messages = document.querySelector('.messages');
const buddyEl = document.querySelector('#buddy');
const subject = document.querySelector('#subject');

const socket = io({ autoConnect: false });
const username = chat.dataset.username;
const userId = parseInt(chat.dataset.userId);
const isActive = chat.dataset.isActive == 'true';

socket.auth = { userId, username };
socket.connect();

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

const editBuddyCard = (user) => {
  if (user == 'none') {
    buddyEl.dataset.userId = null;
    buddyEl.textContent = 'None';
  } else {
  }
};

socket.on('chatMessage', (data) => {
  addMessage(data.username + ': ' + data.message);
});

socket.on('userJoin', (data) => {
  buddyEl.textContent = data.username;
  addMessage(data.username + ' just joined the chat!');
  socket.emit('joinedRoom');
});

socket.on('userLeave', (data) => {
  addMessage(data.username + ' has left the chat.');
  buddyEl.textContent = 'None';
  isActive ? document.location.replace('/') : editBuddyCard('none');
});

addMessage("You have joined the chat as '" + username + "'.");

if (buddyEl.textContent == 'None') {
  socket.emit('createRoom');
} else {
  socket.emit('joinRoom', { roomId: 1 });
}

form.addEventListener('submit', sendMessage, false);

// window.onbeforeunload = () => {
//   return "Are you sure you want to close the window?";
// }
