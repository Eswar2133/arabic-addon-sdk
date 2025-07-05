const http = require("http");
const addonInterface = require("./index");

// Global rejection catcher
process.on("unhandledRejection", (reason, promise) => {
  console.error("🔥 Unhandled Rejection:", reason);
});

// This is the correct HTTP handler function from SDK
const handler = addonInterface; // ✅ should be a function

const server = http.createServer((req, res) => {
  // Add CORS for Stremio
  if (req.url.endsWith(".json")) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // ✅ Call the raw addon interface (it's a function now)
  handler(req, res);
});

const port = process.env.PORT || 7000;
server.listen(port, () => {
  console.log(`✅ Arabic addon is running on port ${port}`);
});
