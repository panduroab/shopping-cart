const app = require('./src/server')();
const db = require('./src/db/db');
const port = 3000;

db({
    domain: '127.0.0.1',
    port: '27017',
    dbName: 'shopping-cart'
}).then(res => {
    console.log('Connected to MongoDB successfuly!!');
})
.catch(err => {
    console.log(err);
});

app.listen(port, () => console.log('Server is running at:', port));