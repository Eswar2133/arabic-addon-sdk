const http = require("http");
const addonInterface = require("./index");

console.log("addonInterface type:", typeof addonInterface);
console.log("addonInterface keys:", Object.keys(addonInterface));

http
  .createServer((req, res) => {
    if (req.url.endsWith(".json")) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json");
    }

    if (typeof addonInterface === "function") {
      addonInterface(req, res);
    } else if (addonInterface && typeof addonInterface.handler === "function") {
      addonInterface.handler(req, res);
    } else {
      res.statusCode = 500;
      res.end("Addon interface not callable");
      console.error("Addon interface is not callable");
    }
  })
  .listen(process.env.PORT || 7000, () => {
    console.log("✅ Arabic addon is running");
  });
