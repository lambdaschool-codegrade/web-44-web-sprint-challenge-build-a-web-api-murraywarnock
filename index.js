require('dotenv').config(); 

const { PORT } = require('./config');
const server = require('./api/server');

server.listen(PORT, () => { 
    console.log(`listening on ${PORT}`)
});

