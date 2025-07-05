const http = require("http");
const addonInterface = require("./index");

http
  .createServer((req, res) => {
    if (req.url.endsWith(".json")) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json");
    }

    // ✅ Corrected handler call
    addonInterface.handler(req, res);
  })
  .listen(process.env.PORT || 7000, () => {
    console.log("✅ Arabic addon is running");
  });
