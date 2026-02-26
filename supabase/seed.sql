-- Seed watch_history
INSERT INTO watch_history (title, detail, date_year, date_month, date_day, type, stars, watched_with) VALUES
('Ted Lasso', 'S1 E5 · Tan Lines', 2026, 2, 25, 'tv', NULL, NULL),
('Ted Lasso', 'S1 E4 · For the Children', 2026, 2, 25, 'tv', NULL, NULL),
('Ted Lasso', 'S1 E3 · Trent Crimm: The Independent', 2026, 2, 25, 'tv', NULL, NULL),
('Ted Lasso', 'S1 E2 · Biscuits', 2026, 2, 25, 'tv', NULL, NULL),
('Ted Lasso', 'S1 E1 · Pilot', 2026, 2, 25, 'tv', NULL, NULL),
('Sacramento Kings @ Houston Rockets', NULL, 2026, 2, 25, 'sports', NULL, NULL),
('Sacramento Kings @ Memphis Grizzlies', NULL, 2026, 2, 23, 'sports', NULL, NULL),
('Olympics', 'Men''s Hockey Gold Medal', 2026, 2, 22, 'sports', NULL, ARRAY['lisa']),
('Olympics', 'Women''s Curling Bronze Medal', 2026, 2, 22, 'sports', NULL, ARRAY['lisa']),
('Sacramento Kings @ San Antonio Spurs', NULL, 2026, 2, 21, 'sports', NULL, NULL),
('Night at the Museum', NULL, 2026, 2, 20, 'movie', NULL, ARRAY['lisa','maddie','claire','annalise','caroline','jake']),
('Schitt''s Creek', 'S2 E5 · Bob''s Bagels', 2026, 2, 19, 'tv', NULL, ARRAY['lisa','maddie','claire']),
('Schitt''s Creek', 'S2 E3 · Jazzagals', 2026, 2, 19, 'tv', NULL, ARRAY['lisa','maddie','claire']),
('Schitt''s Creek', 'S2 E2 · Family Dinner', 2026, 2, 19, 'tv', NULL, ARRAY['lisa','maddie','claire']),
('The Grinder', 'S1 E22 · Full Circle', 2026, 2, 18, 'tv', NULL, ARRAY['lisa','maddie','claire']),
('House MD', 'S1 E2 · Paternity', 2026, 2, 16, 'tv', NULL, ARRAY['claire']),
('Evan Almighty', NULL, 2026, 2, 15, 'movie', NULL, ARRAY['claire','annalise','caroline','jake']),
('House MD', 'S1 E1 · Everybody Lies', 2026, 2, 13, 'tv', NULL, ARRAY['claire']),
('The Grinder', 'S1 E21 · Divergence', 2026, 2, 13, 'tv', NULL, ARRAY['lisa','maddie','claire']);

-- Seed currently_watching
INSERT INTO currently_watching (title, detail, image, "with", sort_order) VALUES
('Survivor', 'Season 50', '/survivor-50.jpg', 'Whole Family', 1),
('House MD', 'Season 1', '/house-md.webp', 'Claire', 2),
('Winter Olympics', 'Milano Cortina 2026', '/olympics.jpg', 'Lisa', 3);

-- Seed need_to_watch
INSERT INTO need_to_watch (title, detail, image, sort_order) VALUES
('Hijack', 'S2', '/hijack.jpg', 1),
('Stranger Things', 'S2–S5', '/stranger-things.webp', 2),
('Alone', 'S12', '/alone.jpg', 3),
('Silo', 'S2', '/silo.jpg', 4),
('Shrinking', 'S1-S3', '/shrinking.jpg', 5);
