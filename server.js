const http = require('http');
const redis = require('redis');
const redisClient = redis.createClient();
const DBConn = require('./db');
const Config = require('./config');
// 
const routes = require('./routes/api');

redisClient.on('connect', () => {
  console.log('Redis Connected!');
});

const db = new DBConn(Config.DB.path);
const server = http.createServer(routes(db, redisClient));
const { HOST, PORT } = Config;
server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

module.exports = server;
