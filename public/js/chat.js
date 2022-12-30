const formEl = document.querySelector('form');
const chatEl = document.querySelector('#chat-page');
const inputEl = document.querySelector('.input');
const messagesEl = document.querySelector('.messages');
const buddyEl = document.querySelector('#buddy');
const subjectEl = document.querySelector('#subject');

const socket = io({ autoConnect: false });
const chatId = parseInt(chatEl.dataset.chatId);
const username = chatEl.dataset.username;
const userId = parseInt(chatEl.dataset.userId);
const isActive = chatEl.dataset.isActive == '1';

socket.auth = { chatId, userId, username };
socket.connect();

const sendMessage = (event) => {
  event.preventDefault();

  addMessage(username + ': ' + inputEl.value);

  socket.emit('chatMessage', {
    message: inputEl.value,
  });

  inputEl.value = '';
  return false;
};

const addMessage = (message) => {
  const li = document.createElement('li');
  li.innerHTML = message;
  messagesEl.appendChild(li);
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
  if (isActive) {
    addMessage('Page will redirect in a few seconds');
    setTimeout(() => {
      document.location.replace('/');
    }, 5000);
  } else {
    editBuddyCard('none');
  }
});

addMessage("You have joined the chat as '" + username + "'.");

if (buddyEl.textContent != 'None') {
  socket.emit('joinRoom');
}

formEl.addEventListener('submit', sendMessage, false);

// window.onbeforeunload = () => {
//   return "Are you sure you want to close the window?";
// }
