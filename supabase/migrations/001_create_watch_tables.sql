-- watch_history
CREATE TABLE watch_history (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    detail TEXT,
    date_year INT NOT NULL,
    date_month INT,
    date_day INT,
    type TEXT NOT NULL DEFAULT 'other',
    stars INT,
    watched_with TEXT[]
);

ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON watch_history FOR SELECT USING (true);

-- currently_watching
CREATE TABLE currently_watching (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    detail TEXT,
    image TEXT NOT NULL,
    "with" TEXT,
    sort_order INT NOT NULL DEFAULT 0
);

ALTER TABLE currently_watching ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON currently_watching FOR SELECT USING (true);

-- need_to_watch
CREATE TABLE need_to_watch (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    detail TEXT,
    image TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

ALTER TABLE need_to_watch ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON need_to_watch FOR SELECT USING (true);

-- Enable realtime on all three tables
ALTER PUBLICATION supabase_realtime ADD TABLE watch_history, currently_watching, need_to_watch;
