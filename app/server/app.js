const express = require('express');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 9999;

const app = express();

const healthApp = express();

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

let isBroken = false;

app.get('/flip', (_, res) => {
  isBroken = !isBroken;
  if (isBroken) {
    res.send('flip to unhealthy\n');
    appServer.close('boom! occur');
    appServer = null;
    healthServer.close('boom! occur');
    healthServer = null;
    process.exit(1);
  } else {
    res.send('flip to healthy\n');
  }
});

healthApp.get('/health', (_, res) => {
  if (isBroken) {
    res.sendStatus(500);
  } else {
    res.send('healthy\n');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

var appServer = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

var healthServer = healthApp.listen('3002', () => {
  console.log('App listening on port 3002!');
});
