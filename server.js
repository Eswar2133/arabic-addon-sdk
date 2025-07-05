const http = require("http");
const addonInterface = require("./index");

// Catch all unhandled rejections for safety
process.on("unhandledRejection", (reason, promise) => {
  console.error("🔥 Unhandled Rejection:", reason);
});

// This is the correct handler (raw HTTP, not Express)
const handler = addonInterface;

// Start HTTP server
const server = http.createServer((req, res) => {
  // Add CORS headers
  if (req.url.endsWith(".json")) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Correct: use the addonInterface directly as handler
  handler(req, res);
});

// Choose port (Render provides one via env variable)
const port = process.env.PORT || 7000;
server.listen(port, () => {
  console.log(`✅ Arabic addon is running on port ${port}`);
});
