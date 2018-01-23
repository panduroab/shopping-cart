const db = require('./src/db/db');
const port = 3000;
const app = require('./src/server');

// Database Connection
db({ domain: '127.0.0.1', port: '27017', dbName: 'shopping-cart' })
    .then(con => console.log('Connected to MongoDB succesfully!!'))
    .catch(err => console.log(err));

// App
app({ logger: 'dev' }).listen(port, () => console.log('Server is running at:', port));