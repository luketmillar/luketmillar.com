-- wall_shapes: the shared graffiti wall, stored as tldraw shape records.
-- Each row is one finished shape (a freehand "draw" stroke or an emoji
-- "sticker"), keyed by its tldraw shape id. Append-only: anyone can add, no one
-- can edit or delete. No login, no attribution.
CREATE TABLE wall_shapes (
    shape_id TEXT PRIMARY KEY,
    shape JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT wall_shapes_size CHECK (pg_column_size(shape) < 65536)
);

ALTER TABLE wall_shapes ENABLE ROW LEVEL SECURITY;

-- Anyone can read the whole wall, and anyone can add a shape. Deliberately no
-- UPDATE or DELETE policy: with RLS on, the anon key can neither modify nor
-- remove shapes, so the wall only ever grows.
CREATE POLICY "public read" ON wall_shapes FOR SELECT USING (true);
CREATE POLICY "public insert" ON wall_shapes FOR INSERT WITH CHECK (true);

-- Stream new shapes to everyone currently looking at the wall.
ALTER PUBLICATION supabase_realtime ADD TABLE wall_shapes;
