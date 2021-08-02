
const { CACHE_EX, HOST, PORT } = process.env;

module.exports = {
  DB: {
    path: './db/sqldb.db',
    schema: './db/schema.sql'
  },
  CACHE_EX: parseInt(CACHE_EX) || 10,
  HOST: HOST || 'localhost',
  PORT: parseInt(PORT) || 5000,
}