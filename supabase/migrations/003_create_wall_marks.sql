-- wall_marks: a shared, ever-growing graffiti/sticker wall.
-- Anyone can add a mark. No one can edit or delete. No login, no attribution.
-- Each mark is a self-contained bit of geometry stored as JSONB:
--   pen:     { t: 'pen',     pts: [[x,y],...], color, size, nonce }
--   spray:   { t: 'spray',   pts: [[x,y],...], color, size, seed, nonce }
--   sticker: { t: 'sticker', emoji, x, y, size, rot, nonce }
-- Coordinates are in shared "world" space (see src/projects/graffiti/config.ts).
CREATE TABLE wall_marks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    kind TEXT NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    -- Keep payloads sane so a single mark can't be abused to store megabytes.
    CONSTRAINT wall_marks_kind_check CHECK (kind IN ('pen', 'spray', 'sticker')),
    CONSTRAINT wall_marks_data_size CHECK (pg_column_size(data) < 16384)
);

ALTER TABLE wall_marks ENABLE ROW LEVEL SECURITY;

-- Anyone can read the whole wall...
CREATE POLICY "public read" ON wall_marks FOR SELECT USING (true);
-- ...and anyone can add to it. Deliberately no UPDATE or DELETE policy:
-- with RLS on and no such policy, the anon key cannot modify or remove marks.
CREATE POLICY "public insert" ON wall_marks FOR INSERT WITH CHECK (true);

-- Stream new marks to everyone currently looking at the wall.
ALTER PUBLICATION supabase_realtime ADD TABLE wall_marks;
