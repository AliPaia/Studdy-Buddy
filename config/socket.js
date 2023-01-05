const { User, Score, Chat } = require('../models');

const initSocket = (io) => {
  io.use((socket, next) => {
    const { chatId, userId, username } = socket.handshake.auth;
    if (chatId && userId && username) {
      socket.chatId = chatId;
      socket.userId = userId;
      socket.username = username;
      next();
    } else return new Error('invalid');
  });

  io.on('connection', async function (socket) {
    const { chatId, userId, username } = socket;
    socket.chatData = await Chat.findByPk(chatId);
    socket.join(chatId);

    socket.on('roomCreated', async (data) => {
      socket.broadcast.emit('roomCreated');
    });

    socket.on('joinRoom', async (data) => {
      socket.broadcast.to(chatId).emit('userJoin', { username, userId });
    });

    socket.on('userJoin', async (data) => {
      socket.buddyUsername = data.username;
      socket.buddyUserId = data.userId;
      socket.chatData.update({ isOpen: false });
    });

    socket.on('chatMessage', async (data) => {
      data.username = socket.username;
      socket.broadcast.to(chatId).emit('chatMessage', data);
    });

    socket.on('userLeave', async (data) => {
      socket.chatData.update({ isOpen: true });
    });

    socket.on('disconnect', async (data) => {
      socket.broadcast.to(chatId).emit('userLeave', { username });
      if (socket.chatData) await socket.chatData.update({ isOpen: false });
    });
  });
};

module.exports = { initSocket };
