SELECT id, comment, datetime_created as "datetime"
FROM comments
WHERE datetime_deleted IS NULL
LIMIT 20;