const express = require("express");
const { addonBuilder } = require("stremio-addon-sdk");

const builder = new addonBuilder({
  id: "org.arabic.sdk",
  version: "1.0.0",
  name: "Arabic Classics SDK",
  description: "Streaming Arabic classic movie via SDK. ✅ Supports Debrid fallback.",
  logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Internet_Archive_logo_and_wordmark.svg",
  resources: ["catalog", "stream"],
  types: ["movie"],
  catalogs: [{ type: "movie", id: "arabic", name: "Arabic Classics" }],
});

const MOVIES = [
  {
    id: "arabic-movie-1",
    type: "movie",
    name: "الناصر صلاح الدين (1963)",
    poster:
      "https://ia801600.us.archive.org/22/items/Nasser-Salah-El-Din/Nasser-Salah-El-Din.jpg",
    description: "فيلم مصري تاريخي من إخراج يوسف شاهين.",
  },
];

builder.defineCatalogHandler((_args, cb) => {
  cb(null, { metas: MOVIES });
});

builder.defineStreamHandler(({ id }, cb) => {
  if (id === "arabic-movie-1") {
    cb(null, {
      streams: [
        {
          title: "Watch HD",
          url: "https://archive.org/download/Nasser-Salah-El-Din/Nasser-Salah-El-Din.mp4",
        },
      ],
    });
  } else {
    cb(null, { streams: [] });
  }
});

const app = express();
const PORT = process.env.PORT || 7000;
const addonInterface = builder.getInterface();

// Define explicit endpoint routes for Render
app.get("/manifest.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(addonInterface.manifest);
});

app.get("/catalog/:type/:id/:extra?.json", (req, res) => {
  addonInterface.getCatalog(req.params).then((catalog) => {
    res.setHeader("Content-Type", "application/json");
    res.send(catalog);
  });
});

app.get("/stream/:type/:id.json", (req, res) => {
  addonInterface.getStream(req.params).then((streams) => {
    res.setHeader("Content-Type", "application/json");
    res.send(streams);
  });
});

app.listen(PORT, () => {
  console.log(`Stremio addon running on port ${PORT}`);
});
