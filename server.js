const http = require("http");
const addonInterface = require("./index");

const handler = addonInterface.get;

const server = http.createServer((req, res) => {
  // Handle CORS for JSON API requests
  if (req.url.endsWith(".json")) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Call the addon interface get method to handle request
  handler(req, res);
});

const port = process.env.PORT || 7000;
server.listen(port, () => {
  console.log(`✅ Arabic addon is running on port ${port}`);
});
