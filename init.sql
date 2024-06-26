-- Create a `snippets` table.
CREATE TABLE snippet (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    private BOOLEAN DEFAULT false,
    created TIMESTAMP NOT NULL,
    expires TIMESTAMP NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(12),
  created_at DATE NOT NULL DEFAULT current_date
);

CREATE TABLE snippet_shared_with(
  user_id INT,
  snippet_id INT
);

ALTER TABLE snippet_shared_with ADD CONSTRAINT snippet_shared_with_user_fk FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE snippet_shared_with ADD CONSTRAINT snippet_shared_with_snippet_fk FOREIGN KEY (snippet_id) REFERENCES snippet (id);
ALTER TABLE snippet_shared_with ADD CONSTRAINT snippet_shared_with_pk PRIMARY KEY (user_id, snippet_id);

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

CREATE OR REPLACE FUNCTION addUsersSharedWithSnippet(_user_id INT, _snippet_id INT) RETURNS BOOLEAN AS $$
DECLARE
BEGIN
  IF NOT EXISTS (SELECT 1 FROM users WHERE id = _user_id) THEN 
    RAISE EXCEPTION 'There is no user with id = [%]', _user_id;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM snippet WHERE id = _snippet_id) THEN 
    RAISE EXCEPTION 'There is no snippet with id = [%]', _snippet_id;
  END IF;

  INSERT INTO snippet_shared_with (user_id, snippet_id)
  VALUES (_user_id, _snippet_id)
  ON CONFLICT (user_id, snippet_id) DO NOTHING;

  RETURN true;
END; $$ language plpgsql;

-- Expired snippet
INSERT INTO snippet (title, content, created, expires)
VALUES ('i shouldnt be able to see this', 'because its already expired', '2024-04-10 11:30:30', '2024-04-12 11:30:30');

-- Add some dummy records (which we'll use in the next couple of chapters).
SELECT createSnippet('An old silent pond', 'An old silent pond...\nA frog jumps into the pond,\nsplash! Silence again.\n\n– Matsuo Bashō', 3);
SELECT createSnippet('Over the wintry forest', 'Over the wintry\nforest, winds howl in rage\nwith no leaves to blow.\n\n– Natsume Soseki', 2);
SELECT createSnippet('First autumn morning', 'First autumn morning\nthe mirror I stare into\nshows my father''s face.\n\n– Murakami Kijo', 1);