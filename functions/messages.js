export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    "SELECT * FROM messages ORDER BY created_at DESC"
  ).all();

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function onRequestPost({ request, env }) {
  const data = await request.json();

  await env.DB.prepare(
    "INSERT INTO messages (name, message) VALUES (?, ?)"
  )
  .bind(data.name, data.message)
  .run();

  return new Response("Saved successfully");
}
