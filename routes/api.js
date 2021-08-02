const { CommentsCtrl } = require('../controllers');

module.exports = (db, redis) => (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  switch (req.url) {
    case '/comments':
      CommentsCtrl(db, redis)(req, res);
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Resource not found' }));
  }
}