const app = require('./src/server')();
const port = 3000;

app.listen(port, () => console.log('Server is running at:', port));