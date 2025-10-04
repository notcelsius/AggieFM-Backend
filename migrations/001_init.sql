CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  spotify_id TEXT UNIQUE NOT NULL,
  display_name TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  spotify_track_id TEXT NOT NULL,
  caption TEXT,
  -- cached snapshot for fast rendering
  song_title TEXT,
  song_artist TEXT,
  album_name TEXT,
  album_art_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
