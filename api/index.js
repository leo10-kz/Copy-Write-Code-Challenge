const server = require('./src/server/index')
const dotenv = require('dotenv')

dotenv.config();
const port = process.env.PORT

server.listen(port, () => {
    console.log(`[SERVER on] : http://localhost:${port}/api`)
  })
  
  //* En cason de error
  server.on('error', (error) => {
    console.log(`[SERVER error]: ${error}`)
  })
