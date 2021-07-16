const express = require('express');
const routes = require('./routes');

const port = 3000;
const app = express();

routes(app);

app.listen(port, () => {
    console.log('API está rodando!');
});

module.exports = app;