const { addonBuilder } = require("stremio-addon-sdk");

const builder = new addonBuilder({
  id: "org.arabic.sdk",
  version: "1.0.0",
  name: "Arabic Classics SDK",
  description: "Streaming Arabic classic movies via SDK.",
  logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Internet_Archive_logo_and_wordmark.svg",
  resources: ["catalog", "stream"],
  types: ["movie"],
  catalogs: [{ type: "movie", id: "arabic", name: "Arabic Classics" }],
});

// Your content
const MOVIES = [
  {
    id: "arabic-movie-1",
    type: "movie",
    name: "الناصر صلاح الدين (1963)",
    poster: "https://ia801600.us.archive.org/22/items/Nasser-Salah-El-Din/Nasser-Salah-El-Din.jpg",
    description: "فيلم مصري تاريخي من إخراج يوسف شاهين.",
  },
];

// Catalog handler
builder.defineCatalogHandler(async (args, cb) => {
  try {
    cb(null, { metas: MOVIES });
  } catch (err) {
    console.error("Catalog error:", err);
    cb(err);
  }
});

// Stream handler
builder.defineStreamHandler(async ({ id }, cb) => {
  try {
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
  } catch (err) {
    console.error("Stream error:", err);
    cb(err);
  }
});

// ✅ Export a raw HTTP interface
module.exports = builder.getInterface();
