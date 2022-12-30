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
    socket.join(chatId);

    socket.on('joinRoom', async (data) => {
      socket.broadcast.to(chatId).emit('userJoin', { username, userId });
    });

    socket.on('userJoin', async (data) => {
      socket.buddyUsername = data.username;
      socket.buddyUserId = data.userId;
      socket.broadcast.to(chatId).emit('userJoin', data);
    });

    socket.on('chatMessage', async (data) => {
      data.username = socket.username;
      socket.broadcast.to(chatId).emit('chatMessage', data);
    });

    socket.on('disconnect', async (data) => {
      socket.broadcast.to(chatId).emit('userLeave', { username });
      const chatData = await Chat.update(
        { isOpen: false },
        { where: { userId } }
      );
    });
  });
};

module.exports = { initSocket };
