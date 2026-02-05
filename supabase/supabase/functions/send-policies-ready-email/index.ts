import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await req.json().catch(() => null);

  if (!body?.request_id) {
    return new Response(
      JSON.stringify({ error: "request_id required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({
      ok: true,
      request_id: body.request_id,
      note: "Function deployed and reachable",
    }),
    { headers: { "Content-Type": "application/json" } }
  );
});
