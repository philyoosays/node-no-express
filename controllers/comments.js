const fs = require('fs');

module.exports = (db, redis) => (req, res) => {
  // callbacks
  const handleSuccess = (data = []) => {
    const dataToSend = data.map(record => {
      if (record.headers) delete record.headers;
      return record;
    })
    res.writeHead(200)
    res.end(JSON.stringify(dataToSend));
  }
  const handleError = (err) => {
    console.error('ResHandler', err)
    res.writeHead(500)
    res.end('Something went wrong');
  }

  // op
  const { headers, method } = req;

  try {
    switch (method) {
      case 'GET':
        db.getComments()
        .then(handleSuccess)
        .catch(handleError);
        break;

      case 'POST':
        let body = {};
        req.on('data', (data) => {
          body = JSON.parse(data);
          db.postComment(body, headers)
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