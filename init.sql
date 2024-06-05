-- Create a `snippets` table.
CREATE TABLE snippet (
    id INTEGER NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created DATE NOT NULL,
    expires DATE NOT NULL
);

-- Add some dummy records (which we'll use in the next couple of chapters).
INSERT INTO snippet (id, title, content, created, expires) VALUES (
    1,
    'An old silent pond',
    'An old silent pond...\nA frog jumps into the pond,\nsplash! Silence again.\n\n– Matsuo Bashō',
    current_date,
    current_date + 180
);

INSERT INTO snippet (id, title, content, created, expires) VALUES (
    2,
    'Over the wintry forest',
    'Over the wintry\nforest, winds howl in rage\nwith no leaves to blow.\n\n– Natsume Soseki',
    current_date,
    current_date + 180
);

INSERT INTO snippet (id, title, content, created, expires) VALUES (
    3,
    'First autumn morning',
    'First autumn morning\nthe mirror I stare into\nshows my father''s face.\n\n– Murakami Kijo',
    current_date,
    current_date + 180
);