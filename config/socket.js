const { User, Score, Chat } = require('../models');

const initSocket = (io) => {
  io.on('connection', async function (socket) {
    let roomId;
    const { username, userId } = socket.handshake.auth;

    socket.username = username;
    socket.userId = userId;

    socket.on('createRoom', async (data) => {
      roomId = userId;
      socket.join(roomId);
    });

    socket.on('joinRoom', async (data) => {
      roomId = data.roomId;
      socket.join(roomId);
      socket.broadcast.to(roomId).emit('userJoin', { username, userId });
    });

    socket.on('userJoin', async (data) => {
      socket.buddyUsername = data.username;
      socket.buddyUserId = data.userId;
      socket.broadcast.to(roomId).emit('userJoin', data);
    });

    socket.on('chatMessage', async (data) => {
      data.username = socket.username;
      socket.broadcast.to(roomId).emit('chatMessage', data);
    });

    socket.on('disconnect', async (data) => {
      socket.broadcast.to(roomId).emit('userLeave', { username });
      const chatData = await Chat.update(
        { isOpen: false },
        { where: { userId } }
      );
    });
  });
};

module.exports = { initSocket };
