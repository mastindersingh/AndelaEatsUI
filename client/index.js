const express = require('express');
const logger= require('morgan');

const app = express();

app.use(logger('dev'));

app.use(express.static(`${__dirname}/dist`));

app.use('*', (request, response) => {
  response.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(process.env.PORT || 3000);
