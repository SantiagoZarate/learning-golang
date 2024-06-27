CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role VARCHAR(12),
  created_at DATE NOT NULL DEFAULT current_date,
  updated_at DATE NOT NULL DEFAULT current_date,
  pfp TEXT DEFAULT ''
);

CREATE TABLE snippet (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    isPrivate BOOLEAN DEFAULT false,
    created TIMESTAMP NOT NULL,
    expires TIMESTAMP NOT NULL,
    author INT NOT NULL 
);

CREATE TABLE snippet_shared_with(
  user_id INT,
  snippet_id INT
);

ALTER TABLE snippet ADD CONSTRAINT snippet_author_fk FOREIGN KEY (author) REFERENCES account (id);

ALTER TABLE snippet_shared_with ADD CONSTRAINT snippet_shared_with_user_fk FOREIGN KEY (user_id) REFERENCES account (id);
ALTER TABLE snippet_shared_with ADD CONSTRAINT snippet_shared_with_snippet_fk FOREIGN KEY (snippet_id) REFERENCES snippet (id);
ALTER TABLE snippet_shared_with ADD CONSTRAINT snippet_shared_with_pk PRIMARY KEY (user_id, snippet_id);

CREATE OR REPLACE FUNCTION createSnippet(_title VARCHAR(100), _content TEXT, _expires INT, _author INT) RETURNS INT AS $$
DECLARE
  snippet_id INT;
BEGIN
  IF _expires <= 0 THEN
    RAISE EXCEPTION 'Invalid expires value';
  END IF;

  INSERT INTO snippet (title, content, created, expires, author)
  VALUES (_title, _content, NOW(), NOW() + _expires * interval '1 day', _author)
  RETURNING id INTO snippet_id;

  RETURN snippet_id;
END; $$ language plpgsql;

CREATE OR REPLACE FUNCTION addUsersSharedWithSnippet(_user_id INT, _snippet_id INT) RETURNS BOOLEAN AS $$
DECLARE
BEGIN
  IF NOT EXISTS (SELECT 1 FROM account WHERE id = _user_id) THEN 
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

CREATE OR REPLACE FUNCTION createAccount(_username VARCHAR(100), _email VARCHAR(100), _role VARCHAR(12), _pfp TEXT) RETURNS VOID AS $$
DECLARE
BEGIN
  INSERT INTO account (username, email, role, password, pfp)
  VALUES (_username, _email, _role, 'password', _pfp);
END; $$ language plpgsql;

-- Add some users
SELECT createAccount('martin', 'martin@gmail.com', 'premium', 'https://i.pinimg.com/736x/27/b0/bc/27b0bc17b1d37b525a4619cdfc8d4049.jpg');
SELECT createAccount('sofia', 'sofia@gmail.com', 'user', 'https://art.ngfiles.com/thumbnails/2279000/2279030_full.webp?f1641415790');
SELECT createAccount('santi', 'santi@gmail.com', 'user', 'https://cdn.personalitylist.com/avatars/543031.png');

-- Expired snippet
INSERT INTO snippet (title, content, created, expires, author)
VALUES ('i shouldnt be able to see this', 'because its already expired', '2024-04-10 11:30:30', '2024-04-12 11:30:30', 1);

-- Add some dummy records (which we'll use in the next couple of chapters).
SELECT createSnippet('An old silent pond', 'An old silent pond...\nA frog jumps into the pond,\nsplash! Silence again.\n\n– Matsuo Bashō', 3, 1);
SELECT createSnippet('Over the wintry forest', 'Over the wintry\nforest, winds howl in rage\nwith no leaves to blow.\n\n– Natsume Soseki', 2, 1);
SELECT createSnippet('First autumn morning', 'First autumn morning\nthe mirror I stare into\nshows my father''s face.\n\n– Murakami Kijo', 1, 1);
