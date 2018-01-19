const db = require('./src/db/db');
const port = 3000;

const config = {
    logger: 'dev',
    dbConfig: {
        domain: '127.0.0.1',
        port: '27017',
        dbName: 'shopping-cart'
    }
};

const app = require('./src/server')(config);

app.listen(port, () => console.log('Server is running at:', port));