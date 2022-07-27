const server = require('./src/server/index')

server.listen(3001, () => {
    console.log('[SERVER on] : http://localhost:3001/api')
  })
  
  //* En cason de error
  server.on('error', (error) => {
    console.log(`[SERVER error]: ${error}`)
  })
