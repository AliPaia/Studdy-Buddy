const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Score, Chat } = require('../../models');

// user hits button to find chat

// do a fetch to chat route to see if any available that user can join
// if there isn't then make one then redirect
// if there is then join and redirect

// load chat from data ???

module.exports = router;
