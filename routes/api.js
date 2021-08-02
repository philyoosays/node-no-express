const { CommentsCtrl } = require('../controllers');

module.exports = (db) => (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  switch (req.url) {
    case '/comments':
      CommentsCtrl(db)(req, res);
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Resource not found' }));
  }
}