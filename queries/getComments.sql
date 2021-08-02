SELECT * FROM comments
WHERE datetime_deleted IS NULL
LIMIT 100;