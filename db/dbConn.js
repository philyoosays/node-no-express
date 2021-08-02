const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const Config = require('../config');
const schema = fs.readFileSync(Config.DB.schema).toString();

const getCommentsSQL = fs.readFileSync('./queries/getComments.sql').toString();
const postCommentSQL = fs.readFileSync('./queries/postComment.sql').toString();

module.exports = class DBConn {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) console.log('Could not connect to database', err);
      else {
        console.log('Connected to database');
        this._runSchema();
      }
    });
  }

  getComments = () => {
    console.log('DBConn.getComments');
    return new Promise((resolve, reject) => {
      this.db.all(getCommentsSQL, [], (err, data) => {
        if (err) {
          console.error('Error running sql ', getCommentsSQL);
          console.error('DBConn.getComments', err);
          reject(err);
        } else {
          console.log(`DBConn.getComments returning ${data.length}`)
          resolve(data);
        }
      });
    });
  }

  postComment = (data) => {
    console.log('DBConn.postComment');
    return new Promise((resolve, reject) => {
      const params = [
        data.comment,
        new Date(),
      ];
      this.db.run(postCommentSQL, params, function (err) {
        if (err) {
          console.error('Error running sql ', postCommentSQL);
          console.error('DBConn.postComment', err);
          reject(err);
        } else {
          console.log(`Inserted ${this.changes} rows`);
          resolve([{ id: this.lastID }]);
        }
      });
    });
  }

  _runSchema = () => {
    return new Promise((resolve, reject) => {
      const queryArr = schema.toString().split(");");
      this.db.serialize(() => {
        this.db.run("BEGIN TRANSACTION;");
        queryArr.forEach(query => {
          if (query) {
            query += ');\n';
            this.db.run(query, err => {
              if (err) {
                console.error('DBConn._runSchema', err);
                reject();
              }
            });
          }
        });
        this.db.run("COMMIT;",[], () => resolve());
      });
    });
  }
}