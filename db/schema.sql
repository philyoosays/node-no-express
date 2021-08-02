CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY,
  comment text NOT NULL,
  datetime_created timestamptz NOT NULL,
  datetime_deleted timestamptz,
  datetime_updated timestamptz
);