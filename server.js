const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 2000;
const CFG = require('./config');
const app = next({ dev: CFG.app.isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) 
      throw err;
    console.log(`[ start ] Kaori Server (${CFG.app.isDev ? 'dev' : 'prd'}) started on ${CFG.app.url}`);
  })
});