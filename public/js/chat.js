const formEl = document.querySelector('form');
const chatEl = document.querySelector('#chat-page');
const inputEl = document.querySelector('.input');
const messagesEl = document.querySelector('.messages');
const buddyEl = document.querySelector('#buddy');
const subjectEl = document.querySelector('#subject');
const connectBtn = document.querySelector('#found-user-modal button');
const reOpenBtn = document.querySelector('#user-left-modal .choices');

const noUserModal = new bootstrap.Modal('#no-user-modal', {
  backdrop: 'static',
  keyboard: false,
});
const foundUserModal = new bootstrap.Modal('#found-user-modal', {
  backdrop: 'static',
  keyboard: false,
});

const socket = io({ autoConnect: false });
const { username, roomStatus } = chatEl.dataset;
const chatId = parseInt(chatEl.dataset.chatId);
const userId = parseInt(chatEl.dataset.userId);
const isActive = chatEl.dataset.isActive == '1';

socket.auth = { chatId, userId, username };

const sendMessage = (event) => {
  event.preventDefault();

  addMessage(username + ': ' + inputEl.value, 'self');

  socket.emit('chatMessage', {
    message: inputEl.value,
  });

  inputEl.value = '';
  return false;
};

const addMessage = (message, user) => {
  const li = document.createElement('li');
  li.classList.add(user);
  li.innerHTML = message;
  messagesEl.appendChild(li);
  li.scrollIntoView();
};

const editBuddyCard = (user) => {
  if (user == '') {
    buddyEl.dataset.userId = null;
    buddyEl.textContent = '';
  } else {
    buddyEl.dataset.userId = user.userId;
    buddyEl.textContent = user.username;
  }
};

socket.on('chatMessage', (data) => {
  addMessage(data.username + ': ' + data.message, 'buddy');
});

socket.on('userJoin', (data) => {
  editBuddyCard(data);
  addMessage(data.username + ' just joined the chat!', 'buddy');
  socket.emit('userJoin', data);
});

socket.on('userLeave', (data) => {
  editBuddyCard('');
  addMessage(data.username + ' has left the chat.', 'buddy');
  if (isActive) {
    socket.disconnect();
    addMessage('Page will redirect in a few seconds', 'buddy');
    setTimeout(() => {
      document.location.replace('/');
    }, 5000);
  } else {
    addMessage('If you wish to find another user, refresh the page', 'buddy');
  }
});

socket.connect();
addMessage("You have joined the chat as '" + username + "'.", 'self');

if (roomStatus == 'joined') {
  socket.emit('joinRoom');
} else if (roomStatus == 'searching') {
  noUserModal.show();

  socket.on('roomCreated', async (data) => {
    const response = await fetch('/api/chats/matching');

    if (response.ok) {
      noUserModal.hide();
      foundUserModal.show();
    }
  });
} else if (roomStatus == 'created') {
  socket.emit('roomCreated');
}

formEl.addEventListener('submit', sendMessage);
connectBtn.addEventListener('click', () => {
  document.location.replace('/chat');
});
