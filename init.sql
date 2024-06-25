-- Create a `snippets` table.
CREATE TABLE snippet (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created TIMESTAMP NOT NULL,
    expires TIMESTAMP NOT NULL
);

CREATE OR REPLACE FUNCTION createSnippet(_title VARCHAR(100), _content TEXT, _expires INT) RETURNS INT AS $$
DECLARE
  snippet_id INT;
BEGIN
  IF _expires <= 0 THEN
    RAISE EXCEPTION 'Invalid expires value';
  END IF;

  INSERT INTO snippet (title, content, created, expires)
  VALUES (_title, _content, NOW(), NOW() + _expires * interval '1 day')
  RETURNING id INTO snippet_id;

  RETURN snippet_id;
END; $$ language plpgsql;

-- Expired snippet
INSERT INTO snippet (title, content, created, expires)
VALUES ('i shouldnt be able to see this', 'because its already expired', '2024-04-10 11:30:30', '2024-04-12 11:30:30');

-- Add some dummy records (which we'll use in the next couple of chapters).
SELECT createSnippet('An old silent pond', 'An old silent pond...\nA frog jumps into the pond,\nsplash! Silence again.\n\n– Matsuo Bashō', 3);
SELECT createSnippet('Over the wintry forest', 'Over the wintry\nforest, winds howl in rage\nwith no leaves to blow.\n\n– Natsume Soseki', 2);
SELECT createSnippet('First autumn morning', 'First autumn morning\nthe mirror I stare into\nshows my father''s face.\n\n– Murakami Kijo', 1);