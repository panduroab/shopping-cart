module.exports = {

    test: {
      client: 'postgresql',
      connection: 'postgres://localhost:3000/product',
      migrations: {
        directory: __dirname + '/src/server/db/migrations'
      },
      seeds: {
        directory: __dirname + '/src/server/db/seeds'
      }
    }

  
  };