SELECT id, comment, datetime_created as "datetime"
FROM comments
WHERE datetime_deleted IS NULL
ORDER BY datetime_created DESC
LIMIT 20;