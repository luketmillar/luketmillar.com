import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

// --- Types ---

interface WatchHistoryRow {
  id: number;
  title: string;
  detail: string | null;
  date_year: number;
  date_month: number | null;
  date_day: number | null;
  type: string;
  stars: number | null;
}

interface CurrentlyWatchingRow {
  id: number;
  title: string;
  detail: string | null;
  image: string;
  sort_order: number;
}

interface NeedToWatchRow {
  id: number;
  title: string;
  detail: string | null;
  image: string;
  sort_order: number;
}

// --- Tool Definitions ---

const tools = [
  {
    name: "query_watch_history",
    description:
      "Query recent watch history, optionally filtered by title (case-insensitive partial match). Returns the most recent entries. Use this to figure out where the user left off in a show.",
    input_schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Optional title to filter by (partial match)",
        },
        limit: {
          type: "number",
          description: "Max entries to return (default 20)",
        },
      },
      required: [],
    },
  },
  {
    name: "get_currently_watching",
    description: "Get the full currently watching list.",
    input_schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_need_to_watch",
    description: "Get the full need to watch list.",
    input_schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "search_tmdb",
    description:
      "Search TMDB for a TV show or movie by name. Returns id, title, overview, poster URL, media type.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query (show or movie name)" },
        type: {
          type: "string",
          enum: ["tv", "movie", "multi"],
          description: "Search type: tv, movie, or multi (default multi)",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "get_tmdb_season",
    description:
      "Get all episodes for a TV show season from TMDB. Returns episode numbers, titles, air dates.",
    input_schema: {
      type: "object",
      properties: {
        show_id: { type: "number", description: "TMDB show ID (from search_tmdb)" },
        season_number: { type: "number", description: "Season number" },
      },
      required: ["show_id", "season_number"],
    },
  },
  {
    name: "get_tmdb_show_images",
    description:
      "Get backdrop and poster image URLs for a show or movie from TMDB. Useful for getting an image when adding to currently watching or need to watch.",
    input_schema: {
      type: "object",
      properties: {
        id: { type: "number", description: "TMDB ID" },
        type: { type: "string", enum: ["tv", "movie"], description: "tv or movie" },
      },
      required: ["id", "type"],
    },
  },
  {
    name: "add_watch_history",
    description:
      "Insert one or more entries into watch_history. Date defaults to today.",
    input_schema: {
      type: "object",
      properties: {
        entries: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              detail: { type: "string", description: "e.g. 'S1 E6 · Two Aces'" },
              type: {
                type: "string",
                enum: ["tv", "movie", "sports", "other"],
              },
              stars: { type: "number", description: "Rating 1-5" },
              date: {
                type: "object",
                properties: {
                  year: { type: "number" },
                  month: { type: "number" },
                  day: { type: "number" },
                },
                required: ["year"],
                description: "Defaults to today if omitted",
              },
            },
            required: ["title", "type"],
          },
        },
      },
      required: ["entries"],
    },
  },
  {
    name: "remove_watch_history",
    description:
      "Remove entries from watch_history. First use query_watch_history to find the entries and their IDs, then pass the IDs here to delete them.",
    input_schema: {
      type: "object",
      properties: {
        ids: {
          type: "array",
          items: { type: "number" },
          description: "Array of watch_history row IDs to delete",
        },
      },
      required: ["ids"],
    },
  },
  {
    name: "update_currently_watching",
    description:
      "Add or remove items from the currently_watching list. When adding, provide title, image URL, and optionally detail. When removing, just provide the title.",
    input_schema: {
      type: "object",
      properties: {
        add: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              detail: { type: "string" },
              image: { type: "string", description: "Image URL (use TMDB backdrop)" },
            },
            required: ["title", "image"],
          },
        },
        remove: {
          type: "array",
          items: { type: "string" },
          description: "Titles to remove (case-insensitive match)",
        },
      },
      required: [],
    },
  },
  {
    name: "update_need_to_watch",
    description:
      "Add or remove items from the need_to_watch list. When adding, provide title, image URL, and optionally detail. When removing, just provide the title.",
    input_schema: {
      type: "object",
      properties: {
        add: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              detail: { type: "string" },
              image: { type: "string", description: "Image URL (use TMDB poster)" },
            },
            required: ["title", "image"],
          },
        },
        remove: {
          type: "array",
          items: { type: "string" },
          description: "Titles to remove (case-insensitive match)",
        },
      },
      required: [],
    },
  },
];

// --- Tool Execution ---

async function executeTool(
  name: string,
  input: Record<string, unknown>,
  supabase: ReturnType<typeof createClient>,
  tmdbApiKey: string,
): Promise<unknown> {
  switch (name) {
    case "query_watch_history": {
      const limit = (input.limit as number) || 20;
      let query = supabase
        .from("watch_history")
        .select("*")
        .order("date_year", { ascending: false })
        .order("date_month", { ascending: false, nullsFirst: false })
        .order("date_day", { ascending: false, nullsFirst: false })
        .order("id", { ascending: false })
        .limit(limit);

      if (input.title) {
        query = query.ilike("title", `%${input.title}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }

    case "get_currently_watching": {
      const { data, error } = await supabase
        .from("currently_watching")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    }

    case "get_need_to_watch": {
      const { data, error } = await supabase
        .from("need_to_watch")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    }

    case "search_tmdb": {
      const type = (input.type as string) || "multi";
      const url = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(input.query as string)}&language=en-US&page=1`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${tmdbApiKey}` },
      });
      const data = await res.json();
      return (data.results || []).slice(0, 5).map((r: Record<string, unknown>) => ({
        id: r.id,
        title: r.title || r.name,
        media_type: r.media_type || type,
        overview: r.overview,
        poster_url: r.poster_path
          ? `https://image.tmdb.org/t/p/w500${r.poster_path}`
          : null,
        backdrop_url: r.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280${r.backdrop_path}`
          : null,
        first_air_date: r.first_air_date,
        release_date: r.release_date,
      }));
    }

    case "get_tmdb_season": {
      const url = `https://api.themoviedb.org/3/tv/${input.show_id}/season/${input.season_number}?language=en-US`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${tmdbApiKey}` },
      });
      const data = await res.json();
      return {
        season_number: data.season_number,
        name: data.name,
        episodes: (data.episodes || []).map(
          (ep: Record<string, unknown>) => ({
            episode_number: ep.episode_number,
            name: ep.name,
            air_date: ep.air_date,
            overview: ep.overview,
          }),
        ),
      };
    }

    case "get_tmdb_show_images": {
      const url = `https://api.themoviedb.org/3/${input.type}/${input.id}/images`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${tmdbApiKey}` },
      });
      const data = await res.json();
      return {
        backdrops: (data.backdrops || []).slice(0, 3).map(
          (img: Record<string, unknown>) => ({
            url: `https://image.tmdb.org/t/p/w1280${img.file_path}`,
            width: img.width,
            height: img.height,
          }),
        ),
        posters: (data.posters || []).slice(0, 3).map(
          (img: Record<string, unknown>) => ({
            url: `https://image.tmdb.org/t/p/w500${img.file_path}`,
            width: img.width,
            height: img.height,
          }),
        ),
      };
    }

    case "add_watch_history": {
      const entries = input.entries as Array<{
        title: string;
        detail?: string;
        type: string;
        stars?: number;
        date?: { year: number; month?: number; day?: number };
      }>;

      const now = new Date();
      const rows = entries.map((e) => ({
        title: e.title,
        detail: e.detail || null,
        type: e.type,
        stars: e.stars || null,
        date_year: e.date?.year ?? now.getFullYear(),
        date_month: e.date?.month ?? now.getMonth() + 1,
        date_day: e.date?.day ?? now.getDate(),
      }));

      const { data, error } = await supabase
        .from("watch_history")
        .insert(rows)
        .select();
      if (error) throw error;
      return { inserted: data.length, rows: data };
    }

    case "remove_watch_history": {
      const ids = input.ids as number[];
      const { data, error } = await supabase
        .from("watch_history")
        .delete()
        .in("id", ids)
        .select();
      if (error) throw error;
      return { deleted: data.length, rows: data };
    }

    case "update_currently_watching": {
      const results: string[] = [];

      if (input.remove && (input.remove as string[]).length > 0) {
        for (const title of input.remove as string[]) {
          const { error } = await supabase
            .from("currently_watching")
            .delete()
            .ilike("title", title);
          if (error) throw error;
          results.push(`Removed "${title}"`);
        }
      }

      if (input.add && (input.add as Array<Record<string, unknown>>).length > 0) {
        // Get max sort_order
        const { data: existing } = await supabase
          .from("currently_watching")
          .select("sort_order")
          .order("sort_order", { ascending: false })
          .limit(1);

        let nextSort = (existing?.[0]?.sort_order ?? -1) + 1;

        const rows = (
          input.add as Array<{
            title: string;
            detail?: string;
            image: string;
          }>
        ).map((item) => ({
          title: item.title,
          detail: item.detail || null,
          image: item.image,
          sort_order: nextSort++,
        }));

        const { error } = await supabase
          .from("currently_watching")
          .insert(rows);
        if (error) throw error;
        results.push(`Added ${rows.map((r) => `"${r.title}"`).join(", ")}`);
      }

      return { results };
    }

    case "update_need_to_watch": {
      const results: string[] = [];

      if (input.remove && (input.remove as string[]).length > 0) {
        for (const title of input.remove as string[]) {
          const { error } = await supabase
            .from("need_to_watch")
            .delete()
            .ilike("title", title);
          if (error) throw error;
          results.push(`Removed "${title}"`);
        }
      }

      if (input.add && (input.add as Array<Record<string, unknown>>).length > 0) {
        const { data: existing } = await supabase
          .from("need_to_watch")
          .select("sort_order")
          .order("sort_order", { ascending: false })
          .limit(1);

        let nextSort = (existing?.[0]?.sort_order ?? -1) + 1;

        const rows = (
          input.add as Array<{
            title: string;
            detail?: string;
            image: string;
          }>
        ).map((item) => ({
          title: item.title,
          detail: item.detail || null,
          image: item.image,
          sort_order: nextSort++,
        }));

        const { error } = await supabase
          .from("need_to_watch")
          .insert(rows);
        if (error) throw error;
        results.push(`Added ${rows.map((r) => `"${r.title}"`).join(", ")}`);
      }

      return { results };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// --- Claude API ---

const SYSTEM_PROMPT = `You are a watch history assistant. The user tells you what they watched or want to track. You have access to their watch history database and TMDB for show metadata.

Rules:
- When adding episodes, look up the user's watch history first to determine where they left off, then use TMDB to get correct episode titles.
- When adding a show to "currently watching" or "need to watch", use TMDB to find a good backdrop/poster image URL.
- Default date is today unless specified otherwise.
- For sports entries, type is "sports". For movies, "movie". For TV, "tv".
- Be concise in your reply — just confirm what was done.
- Always use tools to look up real episode titles. Never guess.`;

interface ClaudeMessage {
  role: "user" | "assistant";
  content: unknown;
}

interface ToolUseBlock {
  type: "tool_use";
  id: string;
  name: string;
  input: Record<string, unknown>;
}

interface TextBlock {
  type: "text";
  text: string;
}

async function callClaude(
  messages: ClaudeMessage[],
  anthropicApiKey: string,
): Promise<{
  stop_reason: string;
  content: (ToolUseBlock | TextBlock)[];
}> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": anthropicApiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools,
      messages,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Claude API error ${res.status}: ${text}`);
  }

  return res.json();
}

// --- Main Handler ---

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  // Auth
  const secret = Deno.env.get("WATCH_API_KEY");
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  const { message } = await req.json();
  if (!message || typeof message !== "string") {
    return new Response(
      JSON.stringify({ error: "Missing 'message' string in body" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY")!;
  const tmdbApiKey = Deno.env.get("TMDB_API_KEY")!;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const messages: ClaudeMessage[] = [{ role: "user", content: message }];
    const actions: { table: string; action: string; title: string; detail?: string }[] =
      [];

    // Tool use loop — max 10 iterations as a safety limit
    for (let i = 0; i < 10; i++) {
      const response = await callClaude(messages, anthropicApiKey);

      if (response.stop_reason === "end_turn") {
        // Extract text reply
        const textBlock = response.content.find(
          (b): b is TextBlock => b.type === "text",
        );
        return new Response(
          JSON.stringify({ reply: textBlock?.text ?? "Done.", actions }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      if (response.stop_reason === "tool_use") {
        // Add assistant message with full content (text + tool_use blocks)
        messages.push({ role: "assistant", content: response.content });

        // Execute each tool call and collect results
        const toolResults: {
          type: "tool_result";
          tool_use_id: string;
          content: string;
        }[] = [];

        for (const block of response.content) {
          if (block.type !== "tool_use") continue;

          try {
            const result = await executeTool(
              block.name,
              block.input,
              supabase,
              tmdbApiKey,
            );

            // Track write actions for the response
            if (block.name === "add_watch_history") {
              const entries = block.input.entries as Array<{
                title: string;
                detail?: string;
              }>;
              for (const e of entries) {
                actions.push({
                  table: "watch_history",
                  action: "insert",
                  title: e.title,
                  detail: e.detail,
                });
              }
            } else if (block.name === "remove_watch_history") {
              const ids = block.input.ids as number[];
              for (const id of ids) {
                actions.push({
                  table: "watch_history",
                  action: "remove",
                  title: `id:${id}`,
                });
              }
            } else if (block.name === "update_currently_watching") {
              for (const title of (block.input.remove as string[]) || []) {
                actions.push({
                  table: "currently_watching",
                  action: "remove",
                  title,
                });
              }
              for (const item of (block.input.add as Array<{ title: string }>) ||
                []) {
                actions.push({
                  table: "currently_watching",
                  action: "insert",
                  title: item.title,
                });
              }
            } else if (block.name === "update_need_to_watch") {
              for (const title of (block.input.remove as string[]) || []) {
                actions.push({
                  table: "need_to_watch",
                  action: "remove",
                  title,
                });
              }
              for (const item of (block.input.add as Array<{ title: string }>) ||
                []) {
                actions.push({
                  table: "need_to_watch",
                  action: "insert",
                  title: item.title,
                });
              }
            }

            toolResults.push({
              type: "tool_result",
              tool_use_id: block.id,
              content: JSON.stringify(result),
            });
          } catch (err) {
            toolResults.push({
              type: "tool_result",
              tool_use_id: block.id,
              content: JSON.stringify({
                error: err instanceof Error ? err.message : String(err),
              }),
            });
          }
        }

        messages.push({ role: "user", content: toolResults });
        continue;
      }

      // Unexpected stop reason
      break;
    }

    return new Response(
      JSON.stringify({
        reply: "Sorry, I wasn't able to complete that request.",
        actions,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Internal error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
