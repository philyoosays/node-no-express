CREATE TABLE IF NOT EXISTS comments (
  commentID INTEGER PRIMARY KEY,
  comment text NOT NULL,
  headers json NOT NULL,
  datetime_created timestamptz NOT NULL,
  datetime_deleted timestamptz,
  datetime_updated timestamptz
);