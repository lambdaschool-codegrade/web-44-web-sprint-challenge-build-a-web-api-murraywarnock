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

server.use('*', (req, res, next) => {
    // catch all, 404 error middleware
    // calling 'next' with an argument sends the argument
    // to the error-handling middleware below
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    next({ status: 404, message: 'not found' }); // this object becomes the "err" in the midd below
  });
  
  server.use((err, req, res, next) => { // error handling middleware
    // when someone else before calls next pasing an arg,
    // this thing shoots back a response to the client if anything goes wrong
    // in ANY of the middlewares that preceed this one
    res.status(err.status || 500).json({ message: `HORROR: ${err.message}` });
  });  

module.exports = server;
