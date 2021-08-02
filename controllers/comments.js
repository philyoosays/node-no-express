
const Config = require('../config');

module.exports = (db, redis) => (req, res) => {
  // callbacks
  const handleSuccess = (data = []) => {
    res.writeHead(200)
    if (typeof data === 'string') res.end(data);
    else res.end(JSON.stringify(data));
    return data;
  }
  const handleError = (err) => {
    console.error('ResHandler', err)
    res.writeHead(500)
    res.end('Something went wrong');
  }

  // op
  const { method } = req;
  // redis.del('comments');

  try {
    switch (method) {
      case 'GET':
        redis.get('comments', (err, data) => {
          if (err) console.error(err);
          else {
            if (data) {
              console.log('Comments retrieved from Redis', data);
              handleSuccess(data);
            } else {
              db.getComments()
              .then(data => {
                // set redis
                const comments = JSON.stringify(data);
                redis.setex('comments', Config.CACHE_EX, comments);
                return data;
              })
              .then(handleSuccess)
              .catch(handleError);
            }
          }
        })
        break;

      case 'POST':
        let body = {};
        req.on('data', (data) => {
          body = JSON.parse(data);
          db.postComment(body)
          .then(handleSuccess)
          .catch(handleError);
        });
        req.on('end', () => {
          if (!Object.keys(body).length) {
            console.log('No data found on POST');
            res.writeHead(200);
            res.end('No data found on POST');
          }
        });
        break;

      default:
        res.writeHead(404)
        res.end('Resource not found');
        break;
    }
  } catch (err) {
    console.error('CommentCtrl', err);
    handleError(err);
  }
}