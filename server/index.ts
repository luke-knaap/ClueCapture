import app from "@/app";

Bun.serve({
  fetch: app.fetch,
  port: 3000,
  idleTimeout: 100,
});

console.log("Server running...");
