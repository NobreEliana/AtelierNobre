const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(path.join(__dirname, 'data-base.json'));

function isAuthorized(req){
  return true;
}

server.use(middlewares);
server.use((req, res, next) => {
  if (isAuthorized(req)) {
    next();
  } else {
    res.sendStatus(401)
  }
 });
server.use('/api', router);
server.listen(5000, () => {
  console.log('JSON Server is running')
});