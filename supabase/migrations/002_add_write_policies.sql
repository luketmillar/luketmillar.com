-- Allow service role to insert/update/delete (edge functions use service role key,
-- which bypasses RLS, so these policies are just for completeness if we ever
-- use the anon key for writes).

-- watch_history
CREATE POLICY "service delete" ON watch_history FOR DELETE USING (true);
CREATE POLICY "service insert" ON watch_history FOR INSERT WITH CHECK (true);

-- currently_watching
CREATE POLICY "service delete" ON currently_watching FOR DELETE USING (true);
CREATE POLICY "service insert" ON currently_watching FOR INSERT WITH CHECK (true);

-- need_to_watch
CREATE POLICY "service delete" ON need_to_watch FOR DELETE USING (true);
CREATE POLICY "service insert" ON need_to_watch FOR INSERT WITH CHECK (true);
