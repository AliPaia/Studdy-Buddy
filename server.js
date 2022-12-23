const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const { createServer } = require('http');
const { Server } = require('socket.io');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", function (socket) {
  socket.on("userJoin", function (data) {
    this.username = data;
    socket.broadcast.emit("userJoin", data);
  });

  socket.on("chatMessage", function (data) {
    data.username = this.username;
    socket.broadcast.emit("chatMessage", data);
  });

  socket.on("disconnect", function (data) {
    socket.broadcast.emit("userLeave", this.username);
  });
});

sequelize.sync({ force: false }).then(() => {
  httpServer.listen(PORT, () => console.log('Now listening'));
});
