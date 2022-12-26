const { User } = require('../models');

const initSocket = (io) => {
  io.on('connection', async function (socket) {
    const { username, userId } = socket.handshake.auth;

    socket.on('userJoin', function (data) {
      this.username = data.username;
      this.userId = data.userId;
      socket.broadcast.emit('userJoin', data);
    });

    socket.on('chatMessage', function (data) {
      data.username = this.username;
      socket.broadcast.emit('chatMessage', data);
      console.log(socket.username);
      console.log(socket.handshake.auth.username);
    });

    socket.on('disconnect', function (data) {
      socket.broadcast.emit('userLeave', this.username);
    });
  });
};

module.exports = { initSocket };
