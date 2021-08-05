// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const express = require('express');

const helmet = require('helmet');
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
const server = express();

server.use(express.json());
server.use(helmet()); 
server.use('/api/projects', (req, res, next) => {next()}, projectsRouter);
server.use('/api/actions', (req, res, next) => {next()}, actionsRouter);



module.exports = server;
