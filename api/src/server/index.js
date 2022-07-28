const express = require("express"); 
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')
const server = express();

const route = require('../routes')

server.use('/', route);

/* server.use(express.static('public')) */
server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(morgan('dev'))
server.use(cors());// App usa cors para que permita al cliente la solicitud a la api  */
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  }); 
 



// endPoint de Error 
server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;