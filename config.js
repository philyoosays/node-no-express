
const { HOST, PORT } = process.env;

module.exports = {
  DB: {
    path: './db/sqldb.db',
    schema: './db/schema.sql'
  },
  HOST: HOST || 'localhost',
  PORT: PORT || 5000,
}