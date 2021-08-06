// Configure your server here
const express = require('express');

const helmet = require('helmet');
const apiRoutes = require("./apiRoutes");
// const projectsRouter = require('./projects/projects-router');
// const actionsRouter = require('./actions/actions-router');
const server = express();

server.use(express.json());
server.use(helmet()); 
server.use("/api", apiRoutes);

server.use('*', (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    next({ status: 404, message: 'not found' }); 
  });
  
server.use((err, req, res, next) => { 
  res.status(err.status || 404).json({ message: `ERROR: ${err.message}` });
});  

module.exports = server;
